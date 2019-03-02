import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  render() {
    const { activeTab } = this.state;
    const { tabs, components } = this.props;
    const activeComponents = components[activeTab];

    const Tabs = tabs.map((tab, i) => (
      <li
        className={classnames({ 'is-active': i === activeTab })}
        onClick={() => this.setState({ activeTab: i })}
        key={tab}
      >
        <a>{tab}</a>
      </li>
    ));

    return (
      <div className={classnames(styles.component)}>
        <div className='tabs'>
          <ul>{Tabs}</ul>
        </div>
        {activeComponents}
      </div>

    );
  }
}

Tabs.propsTypes = {
  tabs: PropTypes.array.isRequired,
  components: PropTypes.arrayOf(PropTypes.array.isRequired),
};

export default Tabs;
