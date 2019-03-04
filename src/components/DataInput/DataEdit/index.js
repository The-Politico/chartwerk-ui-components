import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT } from '../constants/views';

import Transforms from './Transforms';
import JsonTable from './JsonTable';
import JsonCode from './JsonCode';

class DataEdit extends React.Component {
  state = {
    transformColumn: null,
  }

  setTransformColumn = (column) => {
    const { transformColumn } = this.state;
    if (column === transformColumn) {
      this.setState({ transformColumn: null });
    } else {
      this.setState({ transformColumn: column });
    }
  }

  render() {
    const { transformColumn } = this.state;
    const { parsedData, sendState } = this.props;
    const Preview = parsedData.dataType === 'json' ? (
      <JsonCode {...this.props} />
    ) : (
      <JsonTable
        transformColumn={transformColumn}
        setTransformColumn={this.setTransformColumn}
        {...this.props}
      />
    );

    return (
      <div className={classnames(styles.component)}>
        <div className='message'>
          <p>Here's how we parsed your data. You can edit values in the table.</p>
        </div>
        {Preview}
        <Transforms
          transformColumn={transformColumn}
          {...this.props}
        />
        <div className='level nav'>
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
