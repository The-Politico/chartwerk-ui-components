import React from 'react';

import Transformer from 'Components/Data/utils/number/transformer';

const transformer = new Transformer();

class Round extends React.Component {
  render() {
    const { rounding, precision, update } = this.props;
    const currentFormat = rounding || transformer.fixed;
    const fixed = currentFormat === transformer.fixed;
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
                  rounding: fixed ? transformer.fixed : transformer.digits,
                  precision: target.value === '0' ? 0.0 : parseFloat(target.value) || null,
                }
              )}
            />
          </div>
          <div className='control'>
            <a
              className='button'
              onClick={() => update({
                rounding: fixed ? transformer.digits : transformer.fixed,
              })}
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
