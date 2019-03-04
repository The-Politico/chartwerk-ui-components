import React from 'react';
import classnames from 'classnames';

import Transformer from 'Components/DataInput/utils/transformer';

class TableCell extends React.Component {
  state = {
    editing: false,
  }

  type = () => {
    const { columnTypes, column } = this.props;
    return columnTypes[column];
  }

  correctType(type) {
    if (type === 'string') return 'text';
    return type;
  }

  formatEditableCell = (datum) => {
    if (this.type() === 'date') return datum.toISOString().substring(0, 10);
    return datum;
  }

  formatDisplayCell = (datum) => {
    if (this.type() === 'number') return this.applyTransforms(datum);
    if (this.type() === 'date') return datum.toLocaleDateString();
    return datum;
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') this.setState({ editing: false });
  }

  applyTransforms = (value) => {
    return this.transformer.transform(value);
  }

  render() {
    const { editing } = this.state;
    const { columnTypes, column, editingColumn, transforms, row, rowIndex, update } = this.props;
    const type = this.correctType(columnTypes[column]);
    const datum = row[column];
    this.transformer = new Transformer(transforms || {});
    return (
      <td
        className={classnames(type, {
          editing,
          'editing-column': editingColumn,
        })}
        onClick={(e) => this.setState({ editing: true })}
      >
        {editing && <input
          className='editable'
          value={this.formatEditableCell(datum)}
          type={type}
          onChange={({ target }) => {
            update(type, rowIndex, column, target.value);
          }}
          onKeyPress={this.handleKeyPress}
          onBlur={() => this.setState({ editing: false })}
          autoFocus
        />}
        {!editing && <input
          value={this.formatDisplayCell(datum)}
          type={'text'}
          readOnly
        />}
      </td>
    );
  }
}

export default TableCell;
