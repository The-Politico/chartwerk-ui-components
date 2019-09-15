import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { parseByType } from 'Components/Data/utils/parsers';
import Annotator from 'Components/Data/utils/number/Annotator';
import Transformer from 'Components/Data/utils/number/Transformer';

import { datumWidth, indexWidth } from './widths';

import Headers from './Headers';
import Row from './Row';

import { FixedSizeList as List } from 'react-window';

class Table extends React.Component {
  updateData = (type, row, column, value) => {
    const { data, columns, sendState } = this.props;
    const datum = data[row][column];
    // Parse value
    const parsedValue = parseByType(value, type);
    datum.parsed = parsedValue;
    // Re-run transforms and annotations, if needed
    const { transform, annotations } = columns[column];
    let T, A;
    if (datum.transformed) {
      T = new Transformer(transform);
      datum.transformed = T.transform(parsedValue);
    }
    if (datum.annotated) {
      A = new Annotator(annotations);
      datum.annotated = A.annotate(datum.transformed || parsedValue);
    }
    sendState({ data });
  }

  render() {
    const {
      data,
      columns,
      transformColumn,
      setTransformColumn,
      reTypeColumn,
      setReTypeColumn,
    } = this.props;
    return (
      <div className={classnames(styles.component)}>
        <div className='table-footer' />
        <div className='table-container'>
          <div className='table is-fullwidth is-bordered'>
            <Headers
              columns={columns}
              transformColumn={transformColumn}
              setTransformColumn={setTransformColumn}
              reTypeColumn={reTypeColumn}
              setReTypeColumn={setReTypeColumn}
            />
            <List
              itemData={data}
              height={200}
              width={indexWidth + (datumWidth * Object.keys(columns).length) + 15}
              itemCount={data.length}
              itemSize={22}
              overscanCount={10}
            >
              {(props) => (
                <Row
                  {...{
                    columns,
                    transformColumn,
                    update: this.updateData,
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

export default Table;
