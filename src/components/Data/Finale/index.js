import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { EDIT } from '../constants/views';
import Preview from './Preview';

class Finale extends React.Component {
  render() {
    const { sendState, stringData, columnTypes } = this.props;
    return (
      <div className={classnames(styles.component)}>
        <div className='level nav'>
          <Preview data={stringData} types={columnTypes} />
          <button
            className='button'
            onClick={() => sendState({ view: EDIT })}
          >Re-edit data</button>
        </div>
      </div>
    );
  }
}

export default Finale;
