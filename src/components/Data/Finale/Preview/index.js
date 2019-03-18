import React from 'react';
import keys from 'lodash/keys';

import styles from './styles.scss';

const Preview = (props) => {
  const { data } = props;
  if (!data) { return null; }

  const previewRows = data.slice(0, 5);
  if (previewRows.length === 0) { return null; }

  const headers = keys(previewRows[0]);
  const truncatedRowCount = data.length - previewRows.length;

  console.log('headers', headers);
  console.log('previewRows', previewRows);
  console.log('truncatedRowCount', truncatedRowCount);

  return (
    <div className={styles.component + ' preview-container'}>
      <table className='table table-striped'>
        <thead>
          <tr>
            {headers.map(d =>
              <th key={d}>{d}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {previewRows.map(tr =>
            <tr>
              {keys(tr).map(k =>
                <td>{tr[k]}</td>
              )}
            </tr>
          )}
          <tr>
            <td colSpan={headers.length}>And {truncatedRowCount} similiar rows.</td>
          </tr>
        </tbody>

      </table>
    </div>
  );
};

export default Preview;
