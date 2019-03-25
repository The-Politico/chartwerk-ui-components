import React from 'react';
import keys from 'lodash/keys';
import classnames from 'classnames';

import styles from './styles.scss';

const Table = (props) => {
  const { data, columns } = props;
  if (!data) { return null; }

  const previewRows = data.slice(0, 5);
  if (previewRows.length === 0) { return null; }

  const headers = keys(previewRows[0]).sort((a, b) => columns[a].order - columns[b].order);
  const truncatedRowCount = data.length - previewRows.length;

  return (
    <div className={classnames(styles.component, 'preview-container')}>
      <table className='table preview'>
        <thead>
          <tr>
            {headers.map(d =>
              <th key={d}>{d}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {previewRows.map((tr, i) =>
            <tr key={i}>
              {headers.map((k, i) =>
                <td className={columns[k].type} key={i}>{tr[k].raw}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
      <small>... and {truncatedRowCount} similiar rows.</small>
    </div>
  );
};

export default Table;
