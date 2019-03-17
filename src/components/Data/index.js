import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT, EDIT, MAP, END } from './constants/views';

import TextInput from './TextInput';
import DataEdit from './DataEdit';
import DataMap from './DataMap';
import Finale from './Finale';

import Transformer from './utils/transformer';

class Data extends React.Component {
  state = {
    view: INPUT,
    rawData: '',
    stringData: undefined,
    typedData: undefined,
    columnTypes: {},
    columnTransforms: {},
    dataMap: {},
  }

  sendState = (newState) => this.setState(newState)

  updateDataMap = (newMap) => this.setState(state => (
    { dataMap: Object.assign(state.dataMap, newMap) }
  ));

  updateContext = () => {
    const { typedData: data, columnTypes, columnTransforms, dataMap } = this.state;

    const transformers = {};

    Object.keys(columnTransforms).forEach((column) => {
      transformers[column] = new Transformer(columnTransforms[column]);
    });

    this.props.updateData({
      data,
      dataMap,
      columnTypes,
      transformers,
    });
  }

  render() {
    const { dataMapPrompts } = this.props;
    const { view, typedData, stringData, columnTypes, rawData, columnTransforms, dataMap } = this.state;
    return (
      <div className={classnames(styles.component)}>
        {view === INPUT && (
          <TextInput
            defaultValue={rawData}
            sendState={this.sendState}
          />
        )}
        {view === EDIT && (
          <DataEdit
            typedData={typedData}
            stringData={stringData}
            columnTypes={columnTypes}
            columnTransforms={columnTransforms}
            sendState={this.sendState}
          />
        )}
        {view === MAP && (
          <DataMap
            prompts={dataMapPrompts}
            columns={typedData.columns}
            columnTypes={columnTypes}
            dataMap={dataMap}
            updateDataMap={this.updateDataMap}
            sendState={this.sendState}
            updateContext={this.updateContext}
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

Data.defaultProps = {
};

export default Data;
