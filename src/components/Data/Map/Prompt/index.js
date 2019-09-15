import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.scss';

import Warning from './Warning';

class Prompt extends React.Component {
  addToMapping = (column) => {
    const { prompt, map, updateMap } = this.props;
    const mapping = map[prompt.key];
    if (prompt.members === 1) {
      updateMap({ [prompt.key]: column });
    } else {
      if (mapping) mapping.push(column);
      updateMap({ [prompt.key]: mapping || [column] });
    }
  }

  removeFromMapping = (column) => {
    const { prompt, map, updateMap } = this.props;
    const mapping = map[prompt.key];
    if (prompt.members === 1) {
      updateMap({ [prompt.key]: null });
    } else {
      updateMap({ [prompt.key]: mapping.filter(c => c !== column) });
    }
  }

  render() {
    const { prompt, availableColumns, columns, isColumnMemberOfMap, isFull } = this.props;
    const Columns = availableColumns.map((column) => {
      const member = isColumnMemberOfMap(column, prompt.key);
      return (
        <div
          key={column}
          className={classnames('tag', columns[column].type, {
            member: member,
            disabled: isFull && !member,
          })}
          onClick={() => member ?
            this.removeFromMapping(column) : this.addToMapping(column)}
        >
          {column}
        </div>
      );
    });

    return (
      <div className={classnames(styles.component)}>
        <p>{prompt.prompt}</p>
        {prompt.required && (
          <small>
            ( {prompt.members ? prompt.members : null} required )
            <FontAwesomeIcon icon={faCheck} hidden={!isFull} />
          </small>
        )}
        <div className='tags'>
          {Columns.length >= prompt.members ? Columns : <Warning prompt={prompt} />}
        </div>
      </div>
    );
  }
}

Prompt.propTypes = {
  prompt: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  availableColumns: PropTypes.array.isRequired,
  isColumnMemberOfMap: PropTypes.func.isRequired,
  isFull: PropTypes.bool,
  map: PropTypes.object.isRequired,
  updateMap: PropTypes.func.isRequired,
};

export default Prompt;
