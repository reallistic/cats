'use strict';

import {parseString} from 'xml2js';

function receiveData(xmlData, type, opt_parse = true) {
  if (!opt_parse) {
    return {
      type: type,
      data: xmlData
    };
  }

  let data = null;
  parseString(xmlData, (err, result) => {
    data = result;
  });
  return {
    type: type,
    data: data
  };
}

function receiveError(err) {
  return {
    type: 'receive_error',
    data: true,
    err: err
  };
}

function receiveFacts(xmlData) {
  return receiveData(xmlData, 'receive_facts', false);
}

function receiveImages(xmlData) {
  return receiveData(xmlData,'receive_images');
}

function fetchImages() {
  return dispatch => {
    dispatch({type: 'request_images'});
    return fetch('http://mapd-cats.azurewebsites.net/catpics')
      .then(response => response.text())
      .then(json => dispatch(receiveImages(json)))
      .catch(err => dispatch(receiveError(err)));
  };
}

function fetchFacts() {
  return dispatch => {
    dispatch({type: 'request_facts'});
    return fetch('http://mapd-cats.azurewebsites.net/catfacts')
      .then(response => response.json())
      .then(json => dispatch(receiveFacts(json)))
      .catch(err => dispatch(receiveError(err)));
  };
}

export function removeCat(rowId) {
  return {
    type: 'remove_row',
    rowId: rowId
  };
}

export function fetchCats() {
  return dispatch => {
    dispatch(fetchFacts());
    dispatch(fetchImages());
  };
}
