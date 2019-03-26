import React from 'react';
import { faTimes, faDivide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MULTIPLY, DIVIDE } from 'Components/Data/utils/number/Transformer';

class Multiply extends React.Component {
  render() {
    const { operation, multiplier, update } = this.props;
    const currentOperation = operation || DIVIDE;
    const multiplying = currentOperation === MULTIPLY;
    return (
      <div className='field-container'>
        <label className='label'>
          {multiplying ? 'Multiply' : 'Divide'}
        </label>
        <div className='field has-addons multiply'>
          <div className='control'>
            <a
              className='button'
              onClick={() => update({
                operation: multiplying ? DIVIDE : MULTIPLY,
              })}
              disabled={!multiplier}
            >
              <FontAwesomeIcon
                icon={multiplying ? faTimes : faDivide}
                fixedWidth
              />
            </a>
          </div>
          <div className='control'>
            <input
              className='input'
              type='number'
              min='1'
              step='1'
              placeholder='-'
              value={multiplier || ''}
              onChange={({ target }) => update(
                {
                  multiplier: parseFloat(target.value) || null,
                  operation: multiplying ? MULTIPLY : DIVIDE,
                }
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Multiply;
