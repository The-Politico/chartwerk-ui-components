import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import { EDIT, PREVIEW } from '../constants/views';

import Prompt from './Prompt';

class Map extends React.Component {
  /**
   * Columns can only belong to one map. Checks if
   * one is still available.
   */
  isColumnAvailable = (column) => {
    const { map } = this.props;
    let available = true;
    Object.keys(map).forEach(key => {
      const mapping = map[key];
      if (!mapping) return;
      if (mapping === column) available = false;
      if (
        Array.isArray(mapping) &&
        mapping.includes(column)
      ) available = false;
    });
    return available;
  }

  isColumnMemberOfMap = (column, key) => {
    const { map } = this.props;
    const mapping = map[key];
    if (!mapping) return false;
    if (mapping === column || mapping.includes(column)) return true;
    return false;
  }

  /**
   * Does map have as many members as it wants? (0 = ∞)
   */
  isMapFull = (key) => {
    const { map, prompts } = this.props;
    const mapping = map[key];
    if (!mapping) return false;
    const prompt = prompts.filter(p => p.key === key)[0];
    if (prompt.members === 0 || !prompt.members) return false;
    if (prompt.members === 1 && mapping) return true;
    if (prompt.members === mapping.length) return true;
  }

  /**
   * Same as isMapFull, but extra for required maps that have
   * infinite members
   */
  isRequiredMapSatisfied = (key) => {
    const { map, prompts } = this.props;
    const mapping = map[key];
    if (!mapping) return false;
    const prompt = prompts.filter(p => p.key === key)[0];
    if (
      (prompt.members === 0 || !prompt.members) &&
      mapping.length > 0
    ) return true;
    if (prompt.members === 1 && mapping) return true;
    if (prompt.members === mapping.length) return true;
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
    const { columns } = this.props;
    const orderedColumns = Object.keys(columns).sort((a, b) => columns[a].order - columns[b].order);
    return orderedColumns.filter((column) => {
      const columnType = columns[column].type;
      if (prompt.type && columnType !== prompt.type) return false;
      if (
        !this.isColumnAvailable(column) &&
        !this.isColumnMemberOfMap(column, prompt.key)
      ) return false;
      return true;
    });
  }

  render() {
    const { prompts, columns, map, updateMap, sendState, updateContext } = this.props;
    const Prompts = prompts.map(prompt => (
      <Prompt
        key={prompt.key}
        prompt={prompt}
        columns={columns}
        availableColumns={this.getColumnsAvailableToPrompt(prompt)}
        isColumnMemberOfMap={this.isColumnMemberOfMap}
        isFull={this.isMapFull(prompt.key)}
        map={map}
        updateMap={updateMap}
      />
    ));

    return (
      <div className={classnames(styles.component)}>
        <div>
          {Prompts}
        </div>
        <div className='level nav'>
          <button
            className='button'
            onClick={() => sendState({ view: EDIT })}
          >Edit data
          </button>
          <button
            className='button'
            onClick={() => {
              sendState({ view: PREVIEW });
              updateContext();
            }}
            disabled={!this.areRequiredMapsSatistified()}
          >Next
          </button>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  map: PropTypes.object.isRequired,
  updateMap: PropTypes.func.isRequired,
  prompts: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  sendState: PropTypes.func.isRequired,
  updateContext: PropTypes.func.isRequired,
};

export default Map;
