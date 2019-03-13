import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { EDIT } from '../constants/views';

class Finale extends React.Component {
  render() {
    const { sendState } = this.props;
    return (
      <div className={classnames(styles.component)}>
        <p>Data's ready!</p>
        <div className='level nav'>
          <button
            className='button'
            onClick={() => sendState({ view: EDIT })}
          >Re-edit</button>
        </div>
      </div>
    );
  }
}

export default Finale;
