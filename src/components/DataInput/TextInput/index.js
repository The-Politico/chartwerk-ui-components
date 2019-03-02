import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

class TextInput extends React.Component {
  render() {
    return (
      <div className={classnames(styles.component)}>
        <textarea />
      </div>
    );
  }
}

export default TextInput;
