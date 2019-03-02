import React from 'react';
import classnames from 'classnames';
import { component } from './styles.scss';

class Header extends React.Component {
  render() {
    return (
      <div className={classnames(component)}>
        <nav className='navbar' role='navigation' aria-label='main navigation'>
          <div className='navbar-brand'>
            <a className='navbar-item' href={this.props.link}>
              <span className='kraftwerk'>Chartwerk:</span> UI Components
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

Header.defaultProps = {
  link: '../',
};

export default Header;
