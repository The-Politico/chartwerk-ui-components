import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import Multiply from './Multiply';
import Round from './Round';
import Annotate from './Annotate';

class Transform extends React.Component {
  update = (updates) => {
    const { column, transforms, updateTransform } = this.props;
    updateTransform(column, Object.assign(transforms, updates));
  }

  render() {
    const { transforms } = this.props;
    const { operation, multiplier, rounding, precision, prefix, suffix } = transforms;
    return (
      <div className={classnames(styles.component)}>
        <Multiply
          operation={operation}
          multiplier={multiplier}
          update={this.update}
        />
        <Round
          rounding={rounding}
          precision={precision}
          update={this.update}
        />
        <Annotate
          prefix={prefix}
          suffix={suffix}
          update={this.update}
        />
      </div>
    );
  }
}

export default Transform;
