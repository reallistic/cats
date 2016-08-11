'use strict';

import React from 'react';

require('../styles/_catrow.scss');

const CatRow = ({id, image, fact, onRemove}) => (
  <div key={id} className={'cat-row'}>
    <div className={'close'} onClick={() => onRemove(id)}>
      <b/><b/><b/><b/>
    </div>
    <div className={'img'}>
      <img src={image} />
    </div>
    <div className={'fact'}>
      <p>{fact}</p>
    </div>
  </div>
);

export default CatRow;
