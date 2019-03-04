import React from 'react';
import classnames from 'classnames';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TableHead extends React.Component {
  render() {
    const { columns, columnTypes, transformColumn, setTransformColumn } = this.props;
    const Head = columns.map(column => {
      const isNumeric = columnTypes[column] === 'number';
      return (
        <th
          className={classnames({
            number: isNumeric,
            'editing-column': transformColumn === column,
          })}
          key={column}
          onClick={isNumeric ? () => setTransformColumn(column) : null}
        >
          {column}
          {isNumeric && <FontAwesomeIcon icon={faPencilAlt} />}
        </th>
      );
    });
    Head.unshift(<th />);
    const HeadTypes = columns.map(c => <th key={c}>{columnTypes[c]}</th>);
    HeadTypes.unshift(<th />);

    return (
      <thead>
        <tr>{Head}</tr>
        <tr className='types'>{HeadTypes}</tr>
      </thead>
    );
  }
}

export default TableHead;
