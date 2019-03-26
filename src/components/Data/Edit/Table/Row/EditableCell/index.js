import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

import { datumCellWidth } from '../../widths';

class EditableCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const { row, columnKey } = props;
    this.state = {
      editing: false,
      value: this.formatEditableCell(row[columnKey].parsed),
    };
  }

  getType = () => {
    return this.props.column.type;
  }

  correctType = () => {
    const { type } = this.props.column;
    return type === 'string' ? 'text' : type;
  }

  // Convert native types to strings for inputs
  formatEditableCell = (datum) => {
    const { type } = this.props.column;
    if (type === 'number' && datum) return datum.toString();
    if (type === 'date' && datum) return datum.toISOString().substring(0, 10);
    return datum;
  }

  formatDisplayCell = (datum) => {
    if (!datum.parsed) return '';
    const { type } = this.props.column;
    if (type === 'number') {
      return (
        datum.annotated || datum.transformed || datum.parsed
      );
    };
    if (type === 'date') return datum.parsed.toLocaleDateString('en-US', { timeZone: 'UTC' });
    return datum.parsed;
  }

  sendUpdate = () => {
    const { columnKey, rowIndex, update } = this.props;
    const type = this.correctType();
    update(type, rowIndex, columnKey, this.state.value);
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
    const { columnKey, editingColumn, row } = this.props;
    const type = this.correctType();
    const datum = row[columnKey];
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
