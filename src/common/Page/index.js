import React from 'react';
import classnames from 'classnames';
import { component } from './styles.scss';

import Header from '../Header';

class Page extends React.Component {
  render() {
    const { link, title } = this.props;
    return (
      <React.Fragment>
        <Header link={link} />
        <div className={classnames(component)}>
          <section className='section well'>
            <div className='container'>
              <div className='title'>
                <h1>{title}</h1>
              </div>
              <div className='component'>
                {this.props.children}
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

Page.defaultProps = {
  link: '../',
  title: 'Chartwerk interface components',
};

export default Page;
