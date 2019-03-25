import React from 'react';

class Annotate extends React.Component {
  render() {
    const { prefix, suffix, update } = this.props;
    return (
      <div className='field-container'>
        <label className='label'>Prepend / Append</label>
        <div className='field annotate'>
          <div className='control'>
            <input
              className='input left'
              type='text'
              placeholder='$...'
              value={prefix || ''}
              onChange={({ target }) => update(
                { prefix: target.value }
              )}
            />
            <input
              className='input right'
              type='text'
              placeholder='...%'
              value={suffix || ''}
              onChange={({ target }) => update(
                { suffix: target.value }
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Annotate;
