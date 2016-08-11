'use strict';

function uuid() {
  return Math.random().toString(36).substring(2, 7);
}

function createRow(state) {
  let rows = state.get('rows');
  let unmatchedImages = state.get('unmatchedImages');
  let unmatchedFacts = state.get('unmatchedFacts');
  let images = state.get('images');
  let facts = state.get('facts');
  let imageId = unmatchedImages.first();
  let factId = unmatchedFacts.first();
  let id = uuid();
  state = state.set('unmatchedImages', unmatchedImages.remove(imageId));
  state = state.set('unmatchedFacts', unmatchedFacts.remove(factId));
  return state.set('rows', rows.set(id,
    {
      id,
      fact: facts.get(factId),
      image: images.get(imageId)
    }
  ));
}


function storeImage(image, state) {
  let {images, unmatchedImages} = state;
  image.id = image.id[0];
  image.url = image.url[0];
  state = state.set('images', images.set(image.id, image.url));
  if(!images.has(image.id)) {
    state = state.set('unmatchedImages', unmatchedImages.add(image.id));
    state = maybeCreateRows(state);
  }
  return state;
}


function storeFact(fact, state) {
  let unmatchedFacts = state.get('unmatchedFacts');
  let facts = state.get('facts');
  state = state.set('facts', facts.set(fact, fact));
  if(!facts.has(fact)) {
    state = state.set('unmatchedFacts', unmatchedFacts.add(fact));
    state = maybeCreateRows(state);
  }
  return state;
}


function maybeCreateRows(state) {
  while (state.get('unmatchedImages').size > 0 &&
         state.get('unmatchedFacts').size > 0) {
    state = createRow(state);
  }
  return state;
}


export default function dataFormatter(state, action) {
  switch(action.type) {
  case 'remove_row':
    return state.set('rows', state.rows.remove(action.rowId));
  case 'request_facts':
  case 'request_images':
    state = state.set('error', false);
    return state.set('isRefreshing', state.isRefreshing+1);
  case 'receive_error':
    return state.set('error', action.data);
  case 'receive_facts':
    action.data.facts.forEach(fact => {
      state = storeFact(fact, state);
    });
    state = state.set('isRefreshing', state.isRefreshing-1);
    break;
  case 'receive_images':
    action.data.response.data[0].images[0].image.forEach(image => {
      state = storeImage(image, state);
    });
    state = state.set('isRefreshing', state.isRefreshing-1);
    break;
  }

  return maybeCreateRows(state);
}
