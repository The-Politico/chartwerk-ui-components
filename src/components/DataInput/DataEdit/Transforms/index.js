import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import Transform from './Transform/';

class Transforms extends React.Component {
  updateTransform = (column, transforms) => {
    const { columnTransforms, sendState } = this.props;
    sendState({
      columnTransforms: Object.assign(
        columnTransforms, {
          [column]: transforms,
        }
      ),
    });
  }

  render() {
    const { parsedData, columnTransforms, transformColumn } = this.props;

    if (!transformColumn) return null;
    return (
      <div className={classnames(styles.component)}>
        <Transform
          column={transformColumn}
          data={parsedData[transformColumn]}
          transforms={columnTransforms[transformColumn] || {}}
          updateTransform={this.updateTransform}
        />
      </div>
    );
  }
}

export default Transforms;
