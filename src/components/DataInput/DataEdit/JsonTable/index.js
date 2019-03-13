import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { typeStringValue } from 'Components/DataInput/utils/autoType';

import { datumWidth, indexWidth } from './widths';

import Headers from './Headers';
import Row from './Row';

import { FixedSizeList as List } from 'react-window';

class JsonTable extends React.Component {
  updateParsedData = (type, row, prop, value) => {
    const { parsedData, sendState, dateFormats } = this.props;
    parsedData[row][prop] = typeStringValue(value, dateFormats);
    sendState({ parsedData });
  }

  render() {
    const { parsedData, columnTypes, columnTransforms, transformColumn, setTransformColumn } = this.props;
    const { columns } = parsedData;
    return (
      <div className={classnames(styles.component)}>
        <div className='table-container'>
          <div className='table is-fullwidth is-bordered'>
            <Headers
              columns={columns}
              columnTypes={columnTypes}
              transformColumn={transformColumn}
              setTransformColumn={setTransformColumn}
            />
            <List
              itemData={parsedData}
              height={200}
              width={indexWidth + (datumWidth * columns.length)}
              itemCount={parsedData.length}
              itemSize={22}
              overscanCount={10}
            >
              {(props) => (
                <Row
                  {...{
                    columnTypes,
                    columnTransforms,
                    transformColumn,
                    update: this.updateParsedData,
                  }}
                  {...props}
                />
              )}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

export default JsonTable;
