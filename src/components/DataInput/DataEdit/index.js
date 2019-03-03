import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT } from '../constants/views';

import JsonTable from './JsonTable';
import JsonCode from './JsonCode';

class DataEdit extends React.Component {
  render() {
    const { parsedData, sendState } = this.props;
    const Preview = parsedData.dataType === 'json' ? (
      <JsonCode {...this.props} />
    ) : (
      <JsonTable {...this.props} />
    );
    return (
      <div className={classnames(styles.component)}>
        <div className='message'>
          <p>Here's how we parsed your data. You can edit it in the table.</p>
        </div>
        {Preview}
        <div className='level'>
          <button
            className='button'
            onClick={() => sendState({ view: INPUT })}
          >Back</button>
          <button
            className='button'
          >Next</button>
        </div>
      </div>
    );
  }
}

export default DataEdit;
