import React from 'react';
import classnames from 'classnames';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { datumCellWidth } from '../widths';

const TypeCell = (props) => (
  <div
    className={classnames('cell type', {
      editing: props.column === props.reTypeColumn,
    })}
    style={datumCellWidth}
    onClick={() => props.setReTypeColumn(props.column)}
  >
    {props.type === 'string' ? 'text' : props.type}
    <FontAwesomeIcon icon={faPencilAlt} />
  </div>
);

export default TypeCell;
