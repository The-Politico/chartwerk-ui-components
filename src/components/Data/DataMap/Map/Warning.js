import React from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Warning = (props) => (
  <div className='warning'>
    <FontAwesomeIcon icon={faTimes} />
    Not enough {props.prompt.type && (
      <span className='monospace'>{props.prompt.type}</span>
    )} columns left
  </div>
);

export default Warning;
