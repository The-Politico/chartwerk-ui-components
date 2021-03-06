import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

class TextArea extends React.Component {
  render() {
    const { label, inputKey, value, update, placeholder, maxLength, markdownHints } = this.props;
    return (
      <div className={classnames(styles.component)}>
        <div className='field'>
          <label className='label'>{label || inputKey}
            {maxLength &&
              <small
                className={classnames({ zero: maxLength - value.length < 10 })}
              >{maxLength - value.length}
              </small>}
          </label>
          <div className='control'>
            <textarea
              className='textarea'
              type='text'
              placeholder={placeholder}
              maxLength={maxLength}
              rows={3}
              value={value}
              onChange={({ target }) => update({ [inputKey]: target.value })}
            />
            <p className='help' hidden={!markdownHints}>
              <span className='bold'>**bold**</span>
              <span className='italic'>_italic_</span>
              <span className='link'>[link](http...)</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TextArea;
