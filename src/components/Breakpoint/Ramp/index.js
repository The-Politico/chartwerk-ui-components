import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

class Ramp extends React.Component {
  render() {
    const { breakpoints, breakpoint, updateBreakpoint } = this.props;
    const { length } = breakpoints;
    const pointWidth = 100 / length;
    const index = breakpoints.indexOf(breakpoint);
    return (
      <div className={classnames(styles.component)}>
        <div className='level'>
          <div className='level-left'>
            <FontAwesomeIcon icon={faMobileAlt} />
          </div>
          <div className='level-item'>
            <div className='gutter'>
              {breakpoints.map((point, i) => (
                <div
                  className='point-option'
                  style={{ width: `${pointWidth}%` }}
                  onClick={() => updateBreakpoint(point)}
                  key={point}
                />
              ))}
              <div
                className='active-point'
                style={{
                  width: `${pointWidth}%`,
                  left: `${index * pointWidth}%`,
                }}
              />
            </div>
          </div>
          <div className='level-right'>
            <FontAwesomeIcon icon={faDesktop} />
          </div>
        </div>
      </div>
    );
  }
}

export default Ramp;
