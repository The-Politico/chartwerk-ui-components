import React from 'react';
import classnames from 'classnames';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.scss';
import { zipDataCollections, unzipDataCollections } from 'Components/Data/utils/zippers';
import explicitlyType from 'Components/Data/utils/explicitType';

class ReType extends React.Component {
  onChange = ({ target }) => {
    const newType = target.value;
    const { data, columns, reTypeColumn, sendState } = this.props;
    const [stringData, typedData] = unzipDataCollections(data);
    const reTypedData = explicitlyType(typedData, stringData, reTypeColumn, newType);
    columns[reTypeColumn].type = newType;
    // Always delete numeric format config on a retype
    delete columns[reTypeColumn].transform;
    delete columns[reTypeColumn].annotations;

    sendState({
      data: zipDataCollections(stringData, reTypedData),
      columns,
    });
  }

  render() {
    const { reTypeColumn, columns } = this.props;
    if (!reTypeColumn) return null;

    const currentType = columns[reTypeColumn].type;

    return (
      <div className={classnames(styles.component)}>
        <div className='field-container'>
          <h3><FontAwesomeIcon icon={faPencilAlt} /> {reTypeColumn}</h3>
          <div className='control'>
            <label className='radio'>
              <input
                type='radio'
                value='string'
                checked={currentType === 'string'}
                onChange={this.onChange}
              />
            text
            </label>
            <label className='radio'>
              <input
                type='radio'
                value='number'
                checked={currentType === 'number'}
                onChange={this.onChange}
              />
            number
            </label>
            <label className='radio'>
              <input
                type='radio'
                value='date'
                checked={currentType === 'date'}
                onChange={this.onChange}
              />
            date
            </label>
          </div>
          <small><b>Note:</b> If you convert a column to numbers or dates, any values that can't be parsed will be blank.</small>
        </div>
      </div>
    );
  }
}

export default ReType;
