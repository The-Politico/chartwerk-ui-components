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
      columns,
      transformColumn,
      update,
    } = this.props;

    const orderedColumns = Object.keys(columns).sort((a, b) => columns[a].order - columns[b].order);

    const row = data[index];

    const cells = orderedColumns.map(columnKey => (
      <EditableCell
        key={columnKey + index}
        row={row}
        rowIndex={index}
        column={columns[columnKey]}
        columnKey={columnKey}
        editingColumn={transformColumn === columnKey}
        transformColumn={transformColumn}
        update={update}
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
