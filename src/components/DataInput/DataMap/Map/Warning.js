import React from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Warning = (props) => (
  <div className='warning'>
    <FontAwesomeIcon icon={faTimes} />
    Not enough columns
  </div>
);

export default Warning;
