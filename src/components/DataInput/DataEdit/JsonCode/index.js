import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

class JsonCode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classnames(styles.component)}>
        JSON Code here.
      </div>
    );
  }
}

export default JsonCode;
