import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { typeStringValue } from '../../utils/autoType';

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
    const { parsedData, headerTypes } = this.props;
    const { columns } = parsedData;
    const Head = columns.map(c => <th key={c}>{c}</th>);
    const HeadTypes = columns.map(c => <th key={c}>{headerTypes[c]}</th>);
    const Body = parsedData.map((row, rowIndex) => {
      const tds = columns.map(column => (
        <TableCell
          key={column + rowIndex}
          row={row}
          rowIndex={rowIndex}
          column={column}
          update={this.updateParsedData}
          headerTypes={headerTypes}
        />
      ));
      return (<tr key={rowIndex}>{tds}</tr>);
    });
    return (
      <div className={classnames(styles.component)}>
        <div className='table-container'>
          <table className='table is-fullwidth is-hoverable is-bordered'>
            <thead>
              <tr>{Head}</tr>
              <tr className='types'>{HeadTypes}</tr>
            </thead>
            <tbody>{Body}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default JsonTable;
