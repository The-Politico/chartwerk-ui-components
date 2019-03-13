import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import Map from './Map';

class DataMap extends React.Component {
  render() {
    return (
      <div className={classnames(styles.component)}>
        <Map />
        <Map />
        <Map />
      </div>
    );
  }
}

export default DataMap;
