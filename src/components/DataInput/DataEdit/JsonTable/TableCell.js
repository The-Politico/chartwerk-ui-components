import React from 'react';
import classnames from 'classnames';

class TableCell extends React.Component {
  state = {
    editing: false,
  }

  type = () => {
    const { headerTypes, column } = this.props;
    return headerTypes[column];
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

  // TODO
  applyTransforms = (value) => value

  render() {
    const { editing } = this.state;
    const { headerTypes, column, row, rowIndex, update } = this.props;
    const type = this.correctType(headerTypes[column]);
    const datum = row[column];
    return (
      <td
        className={classnames(type, { editing })}
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
