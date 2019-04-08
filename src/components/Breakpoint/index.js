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
  breakpoints: [290, 350, 600],
  breakpoint: 600,
};

Breakpoint.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.number),
  breakpoint: PropTypes.number,
  updateBreakpoint: PropTypes.func.isRequired,
};

export default Breakpoint;
