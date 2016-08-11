'use strict';

import React from 'react';
import CatRow from './CatRow';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('../styles/_catlist.scss');

const CatList = ({rows, onRemove, onRefresh}) => (
  rows.length ? (
    <ReactCSSTransitionGroup transitionName='cat-row'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        component='div' className='cat-list'>
      {rows.map(row => <CatRow {...row} key={row.id} onRemove={onRemove} />)}
    </ReactCSSTransitionGroup>
  ) :
  (
      <div className='cat-list empty'>
        <h3>Weird, there's no cats...</h3>
        <p>Not sure where they went, but you can hit the button to try an get them back</p>
        <button onClick={onRefresh}>Get more cats</button>
      </div>
  )
);

export default CatList;
