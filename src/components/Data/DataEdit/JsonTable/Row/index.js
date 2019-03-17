import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

import EditableCell from './EditableCell';
import IndexCell from './IndexCell';

class Row extends React.PureComponent {
  render() {
    const {
      data,
      index,
      style,
      columnTypes,
      columnTransforms,
      transformColumn,
      update,
    } = this.props;
    const { columns } = data;
    const row = data[index];
    const cells = columns.map(column => (
      <EditableCell
        key={column + index}
        row={row}
        rowIndex={index}
        column={column}
        editingColumn={transformColumn === column}
        transformColumn={transformColumn}
        transforms={columnTransforms[column]}
        update={update}
        columnTypes={columnTypes}
      />
    ));
    cells.unshift(<IndexCell index={index + 1} key={index} />);
    return (
      <div
        className={classnames('row', styles.component)}
        style={style}
      >
        {cells}
      </div>
    );
  }
}

export default Row;
