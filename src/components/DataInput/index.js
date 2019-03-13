import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT, EDIT, MAP, END } from './constants/views';
import defaultDateFormats from './constants/dateFormats';

import TextInput from './TextInput';
import DataEdit from './DataEdit';
import DataMap from './DataMap';
import Finale from './Finale';

class DataInput extends React.Component {
  state = {
    view: INPUT,
    rawData: '',
    parsedData: undefined,
    columnTypes: {},
    columnTransforms: {},
    dataMap: {},
  }

  sendState = (newState) => this.setState(newState)

  updateDataMap = (newMap) => this.setState(state => (
    { dataMap: Object.assign(state.dataMap, newMap) }
  ));

  sendFullData = () => {
    const { parsedData: data, columnTypes, columnTransforms, dataMap } = this.state;

    this.props.updateDataInput({
      data,
      dataMap,
      columnTypes,
      columnTransforms,
    });
  }

  render() {
    const { dateFormats, dataMapPrompts } = this.props;
    const { view, parsedData, columnTypes, rawData, columnTransforms, dataMap } = this.state;
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
        {view === MAP && (
          <DataMap
            prompts={dataMapPrompts}
            columns={parsedData.columns}
            columnTypes={columnTypes}
            dataMap={dataMap}
            updateDataMap={this.updateDataMap}
            sendState={this.sendState}
            sendFullData={this.sendFullData}
          />
        )}
        {view === END && (
          <Finale
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
