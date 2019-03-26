import React from 'react';

import { FIXED, DIGITS } from 'Components/Data/utils/number/Annotator';

class Round extends React.Component {
  render() {
    const { rounding, precision, update } = this.props;
    const currentFormat = rounding || FIXED;
    const fixed = currentFormat === FIXED;
    return (
      <div className='field-container'>
        <label className='label'>Round</label>
        <div className='field has-addons round'>
          <div className='control'>
            <input
              className='input'
              type='number'
              min='0'
              max='100'
              step='1'
              placeholder='-'
              value={precision === 0 ? 0 : precision || ''}
              onChange={({ target }) => update(
                {
                  rounding: fixed ? FIXED : DIGITS,
                  precision: target.value === '0' ? 0.0 : parseFloat(target.value) || null,
                }
              )}
            />
          </div>
          <div className='control'>
            <a
              className='button'
              onClick={() => update({
                rounding: fixed ? DIGITS : FIXED,
              })}
              disabled={!precision}
            >
              {fixed ? 'decimals' : 'sig. digits'}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Round;
