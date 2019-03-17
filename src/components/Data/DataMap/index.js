import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { EDIT, END } from '../constants/views';

import Map from './Map';

class DataMap extends React.Component {
  /**
   * Columns can only belong to one map. Checks if
   * one is still available.
   */
  isColumnAvailable = (column) => {
    const { dataMap } = this.props;
    let available = true;
    Object.keys(dataMap).forEach(key => {
      const map = dataMap[key];
      if (!dataMap[key]) return;
      if (map === column) available = false;
      if (
        Array.isArray(map) &&
        map.includes(column)
      ) available = false;
    });
    return available;
  }

  isColumnMemberOfMap = (column, key) => {
    const { dataMap } = this.props;
    if (!dataMap[key]) return false;
    const map = dataMap[key];
    if (map === column || map.includes(column)) return true;
    return false;
  }

  /**
   * Does map have as many members as it wants? (0 = ∞)
   */
  isMapFull = (key) => {
    const { dataMap, prompts } = this.props;
    if (!dataMap[key]) return false;
    const prompt = prompts.filter(p => p.key === key)[0];
    if (prompt.members === 0 || !prompt.members) return false;
    if (prompt.members === 1 && dataMap[key]) return true;
    if (prompt.members === dataMap[key].length) return true;
  }

  /**
   * Same as isMapFull, but extra for required maps that have
   * infinite members
   */
  isRequiredMapSatisfied = (key) => {
    const { dataMap, prompts } = this.props;
    if (!dataMap[key]) return false;
    const prompt = prompts.filter(p => p.key === key)[0];
    if (
      (prompt.members === 0 || !prompt.members) &&
      dataMap[key].length > 0
    ) return true;
    if (prompt.members === 1 && dataMap[key]) return true;
    if (prompt.members === dataMap[key].length) return true;
    return false;
  }

  areRequiredMapsSatistified = () => {
    const { prompts } = this.props;
    const requirements = prompts
      .filter(p => p.required)
      .map(p => this.isRequiredMapSatisfied(p.key));
    return !requirements.includes(false);
  }

  getColumnsAvailableToPrompt = (prompt) => {
    const { columns, columnTypes } = this.props;
    return columns.filter((column) => {
      const columnType = columnTypes[column];
      if (prompt.type && columnType !== prompt.type) return false;
      if (
        !this.isColumnAvailable(column) &&
        !this.isColumnMemberOfMap(column, prompt.key)
      ) return false;
      return true;
    });
  }

  render() {
    const { prompts, columnTypes, dataMap, updateDataMap, sendState, updateContext } = this.props;
    const Maps = prompts.map(prompt => (
      <Map
        key={prompt.key}
        prompt={prompt}
        columnTypes={columnTypes}
        availableColumns={this.getColumnsAvailableToPrompt(prompt)}
        isColumnMemberOfMap={this.isColumnMemberOfMap}
        isFull={this.isMapFull(prompt.key)}
        map={dataMap[prompt.key]}
        dataMap={dataMap}
        updateDataMap={updateDataMap}
      />
    ));

    return (
      <div className={classnames(styles.component)}>
        <div>
          {Maps}
        </div>
        <div className='level nav'>
          <button
            className='button'
            onClick={() => sendState({ view: EDIT })}
          >Back</button>
          <button
            className='button'
            onClick={() => {
              sendState({ view: END });
              updateContext();
            }}
            disabled={!this.areRequiredMapsSatistified()}
          >Next</button>
        </div>
      </div>
    );
  }
}

export default DataMap;
