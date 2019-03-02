import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import TextInput from './TextInput';

class DataInput extends React.Component {
  render() {
    return (
      <div className={classnames(styles.component)}>
        <TextInput />
      </div>
    );
  }
}

export default DataInput;
