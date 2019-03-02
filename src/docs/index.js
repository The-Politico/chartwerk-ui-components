import * as Components from '../index';

import React from 'react';
import ReactDOM from 'react-dom';

import classnames from 'classnames';
import styles from './styles.scss';

import Page from 'Common/Page';

class Docs extends React.Component {
  render() {
    const links = Object.keys(Components).map(site => (
      <li><a href={`./${site}/`}>{site}</a></li>
    ));
    return (
      <Page>
        <div className={classnames(styles.component)}>
          <ul>{links}</ul>
        </div>
      </Page>
    );
  }
}

ReactDOM.render(<Docs />, document.getElementById('app'));
