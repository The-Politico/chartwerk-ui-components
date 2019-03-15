import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

import ColumnCell from './ColumnCell';
import EmptyCell from './EmptyCell';
import TypeCell from './TypeCell';

class Headers extends React.Component {
  render() {
    const {
      columns,
      columnTypes,
      transformColumn,
      setTransformColumn,
      reTypeColumn,
      setReTypeColumn,
    } = this.props;

    const Header = columns.map((column, i) => (
      <ColumnCell
        key={i}
        column={column}
        isNumeric={columnTypes[column] === 'number'}
        {...{ transformColumn, setTransformColumn }}
      />
    ));
    Header.unshift(<EmptyCell key={'empty'} />);

    const HeaderTypes = columns.map((column, i) =>
      <TypeCell
        column={column}
        type={columnTypes[column]}
        key={i}
        {...{ reTypeColumn, setReTypeColumn }}
      />
    );
    HeaderTypes.unshift(<EmptyCell key={'empty'} />);

    return (
      <div className={classnames('header', styles.component)}>
        <div className='row'>{Header}</div>
        <div className='row'>{HeaderTypes}</div>
      </div>
    );
  }
}

export default Headers;
