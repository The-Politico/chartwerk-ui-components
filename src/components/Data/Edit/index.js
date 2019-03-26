import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT, MAP } from '../constants/views';

import Table from './Table';
import Transforms from './Transforms';
import ReType from './ReType';

class Edit extends React.Component {
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
          <p>Here's how we parsed your data. You can edit values in the table and format or re-type columns by clicking a header.</p>
        </div>
        <Table
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
          >New data</button>
          <button
            className='button'
            onClick={() => sendState({ view: MAP })}
          >Next</button>
        </div>
      </div>
    );
  }
}

Edit.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};

export default Edit;
