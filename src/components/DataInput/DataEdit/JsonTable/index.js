import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { typeStringValue } from 'Components/DataInput/utils/autoType';

import TableHead from './TableHead';
import TableCell from './TableCell';

class JsonTable extends React.Component {
  updateParsedData = (type, row, prop, value) => {
    const { parsedData, sendState, dateFormats } = this.props;
    // Allow text to pass so spaces aren't trimmed during the type check
    if (type === 'text') {
      parsedData[row][prop] = value;
    } else {
      parsedData[row][prop] = typeStringValue(value, dateFormats);
    }
    sendState({ parsedData });
  }

  render() {
    const { parsedData, columnTypes, columnTransforms, transformColumn, setTransformColumn } = this.props;
    const { columns } = parsedData;
    const Body = parsedData.map((row, rowIndex) => {
      const tds = columns.map(column => (
        <TableCell
          key={column + rowIndex}
          row={row}
          rowIndex={rowIndex}
          column={column}
          editingColumn={transformColumn === column}
          transformColumn={transformColumn}
          transforms={columnTransforms[column]}
          update={this.updateParsedData}
          columnTypes={columnTypes}
        />
      ));
      tds.unshift(<td className='index'>{rowIndex + 1}</td>);
      return (<tr key={rowIndex}>{tds}</tr>);
    });

    return (
      <div className={classnames(styles.component)}>
        <div className='table-container'>
          <table className='table is-fullwidth is-hoverable is-bordered'>
            <TableHead
              columns={columns}
              columnTypes={columnTypes}
              transformColumn={transformColumn}
              setTransformColumn={setTransformColumn}
            />
            <tbody>{Body}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default JsonTable;
