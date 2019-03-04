import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT, EDIT } from './constants/views';
import defaultDateFormats from './constants/dateFormats';

import TextInput from './TextInput';
import DataEdit from './DataEdit';

class DataInput extends React.Component {
  state = {
    view: INPUT,
    rawData: '',
    parsedData: undefined,
    columnTypes: {},
    columnTransforms: {},
    columnMaps: {},
  }

  sendState = (newState) => this.setState(newState)

  render() {
    const { dateFormats } = this.props;
    const { view, parsedData, columnTypes, rawData, columnTransforms } = this.state;

    return (
      <div className={classnames(styles.component)}>
        {view === INPUT && (
          <TextInput
            defaultValue={rawData}
            dateFormats={dateFormats}
            sendState={this.sendState}
          />
        )}
        {view === EDIT && (
          <DataEdit
            dateFormats={dateFormats}
            parsedData={parsedData}
            columnTypes={columnTypes}
            columnTransforms={columnTransforms}
            sendState={this.sendState}
          />
        )}
      </div>
    );
  }
}

DataInput.defaultProps = {
  dateFormats: defaultDateFormats,
};

export default DataInput;
