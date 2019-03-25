import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import { INPUT, EDIT } from '../constants/views';
import Table from './Table';

class Preview extends React.Component {
  render() {
    const { sendState, data, columns } = this.props;
    return (
      <div className={classnames(styles.component)}>
        <div className='level nav'>
          <Table
            data={data}
            columns={columns}
          />
          <button
            className='button'
            onClick={() => sendState({ view: EDIT })}
          >Edit data</button>
          <button
            className='button'
            onClick={() => sendState({ view: INPUT })}
          >New data</button>
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  sendState: PropTypes.func.isRequired,
};

export default Preview;
