import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import Transform from './Transform/';

import Annotator from 'Components/Data/utils/number/Annotator';
import Transformer from 'Components/Data/utils/number/Transformer';

class Transforms extends React.Component {
  isTransformNull = (transform) => !transform || !transform.multiplier

  isAnnotationNull = (annotations) => (
    !annotations || (
      !annotations.prefix && !annotations.suffix && !annotations.precision
    ))

  transformData = (transform) => {
    const { data, transformColumn: column } = this.props;
    const newData = data.slice();
    if (this.isTransformNull(transform)) {
      newData.forEach((d) => { delete d[column].transformed; });
      return newData;
    }
    const T = new Transformer({ ...transform });
    newData.forEach((d) => {
      d[column].transformed = T.transform(d[column].parsed);
    });
    return newData;
  }

  annotateData = (annotations, transform) => {
    const { transformColumn: column } = this.props;
    const newData = this.transformData(transform);
    if (this.isAnnotationNull(annotations)) {
      newData.forEach((d) => { delete d[column].annotated; });
      return newData;
    }
    const A = new Annotator({ ...annotations });
    newData.forEach((d) => {
      d[column].annotated = A.annotate(d[column].transformed || d[column].parsed);
    });
    return newData;
  }

  updateTransform = (column, transform) => {
    const { columns, sendState } = this.props;
    const { annotations } = columns[column];
    const newColumns = Object.assign({}, columns);
    newColumns[column].transform = transform;
    // Delete if null
    if (this.isTransformNull(transform)) delete newColumns[column].transform;

    sendState({
      columns: newColumns,
      data: this.annotateData(annotations, transform),
    });
  }

  updateAnnotations = (column, annotations) => {
    const { columns, sendState } = this.props;
    const { transform } = columns[column];
    const newColumns = Object.assign({}, columns);
    newColumns[column].annotations = annotations;
    // Delete if nulls
    if (this.isAnnotationNull(annotations)) delete newColumns[column].annotations;
    sendState({
      columns: newColumns,
      data: this.annotateData(annotations, transform),
    });
  }

  render() {
    const { data, columns, transformColumn } = this.props;

    if (!transformColumn) return null;
    return (
      <div className={classnames(styles.component)}>
        <Transform
          columnKey={transformColumn}
          data={data}
          transform={columns[transformColumn].transform || {}}
          updateTransform={this.updateTransform}
          annotations={columns[transformColumn].annotations || {}}
          updateAnnotations={this.updateAnnotations}
        />
      </div>
    );
  }
}

export default Transforms;
