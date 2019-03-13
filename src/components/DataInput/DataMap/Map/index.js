import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

class Map extends React.Component {
  addToMap = (column) => {
    const { prompt, dataMap, updateDataMap } = this.props;
    const map = dataMap[prompt.key];
    if (prompt.members === 1) {
      updateDataMap({ [prompt.key]: column });
    } else {
      if (map) map.push(column);
      updateDataMap({ [prompt.key]: map || [column] });
    }
  }

  removeFromMap = (column) => {
    const { prompt, dataMap, updateDataMap } = this.props;
    const map = dataMap[prompt.key];
    if (prompt.members === 1) {
      updateDataMap({ [prompt.key]: null });
    } else {
      updateDataMap({ [prompt.key]: map.filter(c => c !== column) });
    }
  }

  render() {
    const { prompt, availableColumns, columnTypes, isColumnMemberOfMap, isFull } = this.props;
    const Columns = availableColumns.map((column) => {
      const member = isColumnMemberOfMap(column, prompt.key);
      return (
        <div
          key={column}
          className={classnames('tag', columnTypes[column], {
            member: member,
            disabled: isFull && !member,
          })}
          onClick={() => member ?
            this.removeFromMap(column) : this.addToMap(column)
          }
        >
          {column}
        </div>
      );
    });

    return (
      <div className={classnames(styles.component)}>
        <p>{prompt.prompt}</p>
        <div className='tags'>
          {Columns}
        </div>
      </div>
    );
  }
}

export default Map;