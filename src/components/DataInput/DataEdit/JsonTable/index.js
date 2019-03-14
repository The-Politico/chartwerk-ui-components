import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { autoTypeString } from 'Components/DataInput/utils/autoTyper';

import { datumWidth, indexWidth } from './widths';

import Headers from './Headers';
import Row from './Row';

import { FixedSizeList as List } from 'react-window';

class JsonTable extends React.Component {
  updatetypedData = (type, row, prop, value) => {
    const { typedData, sendState, dateFormats } = this.props;
    typedData[row][prop] = autoTypeString(value, dateFormats);
    sendState({ typedData });
  }

  render() {
    const { typedData, columnTypes, columnTransforms, transformColumn, setTransformColumn } = this.props;
    const { columns } = typedData;
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
              itemData={typedData}
              height={200}
              width={indexWidth + (datumWidth * columns.length)}
              itemCount={typedData.length}
              itemSize={22}
              overscanCount={10}
            >
              {(props) => (
                <Row
                  {...{
                    columnTypes,
                    columnTransforms,
                    transformColumn,
                    update: this.updatetypedData,
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
