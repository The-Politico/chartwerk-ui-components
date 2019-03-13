import React from 'react';

import { datumCellWidth } from '../widths';

const TypeCell = (props) => (
  <div
    className='cell type'
    style={datumCellWidth}
  >
    {props.type === 'string' ? 'text' : props.type}
  </div>
);

export default TypeCell;
