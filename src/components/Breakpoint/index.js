import React from 'react';
import PropTypes from 'prop-types';

import Ramp from './Ramp';

class Breakpoint extends React.Component {
  render() {
    const { breakpoint } = this.props;
    return (
      <div>
        <Ramp {...this.props} />
        <div
          className='preview'
          style={{ width: `${breakpoint}px` }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Breakpoint.defaultProps = {
  breakpoints: [290, 600],
  breakpoint: 290,
};

Breakpoint.propTypes = {
  breakpoints: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    const breakpoint = propValue[key];
    if (isNaN(breakpoint) || !Number.isInteger(breakpoint)) {
      return new Error(
        `Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. ` +
        `Should be an integer.`
      );
    }
  }),
  breakpoint: (props, propName, componentName) => {
    const breakpoint = props[propName];
    const { breakpoints } = props;
    if (isNaN(breakpoint) || !Number.isInteger(breakpoint)) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
        `Should be an integer.`
      );
    }
    if (breakpoints.indexOf(breakpoint) === -1) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
        `Should be an integer included in the \`breakpoints\` prop array.`
      );
    }
  },
  updateBreakpoint: PropTypes.func.isRequired,
};

export default Breakpoint;
