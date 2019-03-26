import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import Multiply from './Multiply';
import Round from './Round';
import Annotate from './Annotate';

class Transform extends React.Component {
  updateTransform = (updates) => {
    const { columnKey, transform, updateTransform } = this.props;
    updateTransform(columnKey, Object.assign(transform, updates));
  }

  updateAnnotations = (updates) => {
    const { columnKey, annotations, updateAnnotations } = this.props;
    updateAnnotations(columnKey, Object.assign(annotations, updates));
  }

  render() {
    const { transform, annotations } = this.props;
    const { operation, multiplier } = transform;
    const { rounding, precision, prefix, suffix } = annotations;
    return (
      <div className={classnames(styles.component)}>
        <Multiply
          operation={operation}
          multiplier={multiplier}
          update={this.updateTransform}
        />
        <Round
          rounding={rounding}
          precision={precision}
          update={this.updateAnnotations}
        />
        <Annotate
          prefix={prefix}
          suffix={suffix}
          update={this.updateAnnotations}
        />
      </div>
    );
  }
}

export default Transform;
