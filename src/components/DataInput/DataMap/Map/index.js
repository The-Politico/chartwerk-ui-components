import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

class Map extends React.Component {
  render() {
    return (
      <div className={classnames(styles.component)}>
        <p>Which columns do you want to include in your table?</p>
        <div className='tags'>
          <div className='tag date'>dates</div>
          <div className='tag number'>numbers</div>
          <div className='tag string'>a really long column label</div>
        </div>
      </div>
    );
  }
}

export default Map;
