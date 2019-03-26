import React from 'react';
import keys from 'lodash/keys';
import classnames from 'classnames';

import styles from './styles.scss';

class Table extends React.Component {
  formatDisplayCell = (columnType, datum) => {
    if (!datum) return '';
    if (columnType === 'number') {
      return (
        datum.annotated || datum.transformed || datum.parsed
      );
    };
    if (columnType === 'date') return datum.parsed.toLocaleDateString('en-US', { timeZone: 'UTC' });
    return datum.parsed;
  }

  render() {
    const { data, columns } = this.props;
    if (!data) { return null; }

    const previewRows = data.slice(0, 5);
    if (previewRows.length === 0) { return null; }

    const headers = keys(previewRows[0]).sort((a, b) => columns[a].order - columns[b].order);
    const truncatedRowCount = data.length - previewRows.length;

    return (
      <div className={classnames(styles.component, 'preview-container')}>
        <div className='table-footer' />
        <table className='table preview'>
          <thead>
            <tr>
              <th className='cell index' />
              {headers.map(d =>
                <th key={d}>{d}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {previewRows.map((row, i) =>
              <tr key={i}>
                <td className='cell index'>{i + 1}</td>
                {headers.map((column, i) =>
                  <td
                    className={classnames('cell', columns[column].type)}
                    key={i}
                  >
                    {this.formatDisplayCell(columns[column].type, row[column])}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
        <small>... and {truncatedRowCount} similiar rows.</small>
      </div>
    );
  }
}

export default Table;
