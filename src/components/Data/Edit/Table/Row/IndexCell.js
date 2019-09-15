import React from 'react';

import { indexCellWidth } from '../widths';

const IndexCell = (props) => (
  <div
    style={indexCellWidth}
    className='cell index'
  >{props.index}
  </div>
);

export default IndexCell;
