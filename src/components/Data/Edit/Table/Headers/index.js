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
      transformColumn,
      setTransformColumn,
      reTypeColumn,
      setReTypeColumn,
    } = this.props;

    const orderedColumns = Object.keys(columns).sort((a, b) => columns[a].order - columns[b].order);

    const Header = orderedColumns.map((column, i) => (
      <ColumnCell
        key={i}
        column={column}
        isNumeric={columns[column].type === 'number'}
        {...{ transformColumn, setTransformColumn }}
      />
    ));
    Header.unshift(<EmptyCell key={'empty'} />);

    const HeaderTypes = orderedColumns.map((column, i) =>
      <TypeCell
        column={column}
        type={columns[column].type}
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
