import React from 'react';
import classnames from 'classnames';

import { datumCellWidth } from '../widths';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ColumnCell = (props) => (
  <div
    style={datumCellWidth}
    className={classnames('cell header', {
      number: props.isNumeric,
      'editing-column': props.transformColumn === props.column,
    })}
    key={props.column}
    onClick={props.isNumeric ? () => props.setTransformColumn(props.column) : null}
  >
    {props.column}
    {props.isNumeric && <FontAwesomeIcon icon={faPencilAlt} />}
  </div>
);

export default ColumnCell;
