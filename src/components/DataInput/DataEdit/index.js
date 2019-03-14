import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT, MAP } from '../constants/views';

import Transforms from './Transforms';
import JsonTable from './JsonTable';

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
    const { sendState } = this.props;

    return (
      <div className={classnames(styles.component)}>
        <div className='message'>
          <p>Here's how we parsed your data. You can edit values in the table.</p>
        </div>
        <JsonTable
          transformColumn={transformColumn}
          setTransformColumn={this.setTransformColumn}
          {...this.props}
        />
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
            onClick={() => sendState({ view: MAP })}
          >Next</button>
        </div>
      </div>
    );
  }
}

export default DataEdit;
