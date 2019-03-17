import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

import { datumCellWidth } from '../../widths';

import Transformer from 'Components/Data/utils/transformer';

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    const { row, column } = props;
    this.state = {
      editing: false,
      value: this.formatEditableCell(row[column]),
    };
  }

  getType = () => {
    const { columnTypes, column } = this.props;
    return columnTypes[column];
  }

  correctType = () => {
    const type = this.getType();
    return type === 'string' ? 'text' : type;
  }

  // Convert native types to strings for inputs
  formatEditableCell = (datum) => {
    if (this.getType() === 'number' && datum) return datum.toString();
    if (this.getType() === 'date' && datum) return datum.toISOString().substring(0, 10);
    return datum;
  }

  formatDisplayCell = (datum) => {
    if (!datum) return '';
    if (this.getType() === 'number') return this.applyTransforms(datum);
    if (this.getType() === 'date') return datum.toLocaleDateString('en-US', { timeZone: 'UTC' });
    return datum;
  }

  sendUpdate = () => {
    const { column, rowIndex, update } = this.props;
    const type = this.correctType();
    update(type, rowIndex, column, this.state.value);
  }

  applyTransforms = (value) => {
    return this.transformer.transform(value);
  }

  onEdit = ({ target }) => {
    this.setState({ value: target.value });
  }

  onKeyPress = (e) => {
    if (e.key !== 'Enter') return;
    this.setState({ editing: false });
    this.sendUpdate();
  }

  onBlur = () => {
    this.setState({ editing: false });
    this.sendUpdate();
  }

  render() {
    const { editing, value } = this.state;
    const { column, editingColumn, transforms, row } = this.props;
    const type = this.correctType();
    const datum = row[column];
    this.transformer = new Transformer(transforms || {});
    return (
      <div
        style={datumCellWidth}
        className={classnames('cell', styles.component, {
          editing,
          'editing-column': editingColumn,
        })}
        onClick={(e) => this.setState({ editing: true })}
      >
        {editing && <input
          className={classnames('editable', type)}
          value={value}
          type={type}
          onChange={this.onEdit}
          onKeyPress={this.onKeyPress}
          onBlur={this.onBlur}
          autoFocus
        />}
        {!editing && <input
          className={type}
          value={this.formatDisplayCell(datum)}
          type={'text'}
          readOnly
        />}
      </div>
    );
  }
}

export default EditableCell;
