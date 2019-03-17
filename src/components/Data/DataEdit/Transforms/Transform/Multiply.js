import React from 'react';
import { faTimes, faDivide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Transformer from 'Components/Data/utils/transformer';

const transformer = new Transformer();

class Multiply extends React.Component {
  render() {
    const { operation, multiplier, update } = this.props;
    const currentOperation = operation || transformer.divide;
    const multiplying = currentOperation === transformer.multiply;
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
                operation: multiplying ? transformer.divide : transformer.multiply,
              })}
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
                  operation: multiplying ? transformer.multiply : transformer.divide,
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
