import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT, MAP } from '../constants/views';

import JsonTable from './JsonTable';
import Transforms from './Transforms';
import ReType from './ReType';

class DataEdit extends React.Component {
  state = {
    transformColumn: null,
    reTypeColumn: null,
  }

  setTransformColumn = (column) => {
    const { transformColumn } = this.state;
    if (column === transformColumn) {
      this.setState({ transformColumn: null });
    } else {
      this.setState({ transformColumn: column, reTypeColumn: null });
    }
  }

  setReTypeColumn = (column) => {
    const { reTypeColumn } = this.state;
    if (column === reTypeColumn) {
      this.setState({ reTypeColumn: null });
    } else {
      this.setState({ reTypeColumn: column, transformColumn: null });
    }
  }

  render() {
    const { transformColumn, reTypeColumn } = this.state;
    const { sendState } = this.props;

    return (
      <div className={classnames(styles.component)}>
        <div className='message'>
          <p>Here's how we parsed your data. You can edit values in the table.</p>
        </div>
        <JsonTable
          transformColumn={transformColumn}
          setTransformColumn={this.setTransformColumn}
          reTypeColumn={reTypeColumn}
          setReTypeColumn={this.setReTypeColumn}
          {...this.props}
        />
        <Transforms
          transformColumn={transformColumn}
          {...this.props}
        />
        <ReType
          reTypeColumn={reTypeColumn}
          {...this.props}
        />
        <div className='level nav'>
          <button
            className='button'
            onClick={() => sendState({ view: INPUT })}
          >Back</button>
          <button
            className='button'
            onClick={() => sendState({ view: MAP })}
          >Next</button>
        </div>
      </div>
    );
  }
}

export default DataEdit;
