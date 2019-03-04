import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { EDIT } from '../constants/views';

import parse from '../utils/parseDataString';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      parseError: false,
    };
  }

  parseDataString = () => {
    this.setState({ parseError: false });
    const { sendState } = this.props;
    const parsedData = parse(this.state.value);
    if (!parsedData) {
      this.setState({ parseError: true });
      return;
    }
    const columnTypes = {};
    parsedData.columns.forEach(c => {
      let type;
      const d = parsedData[0][c];
      if (typeof d === 'string') type = 'string';
      if (typeof d === 'number') type = 'number';
      if (d instanceof Date) type = 'date';
      columnTypes[c] = type;
    });
    sendState({
      parsedData,
      columnTypes,
      columnTransforms: {},
      rawData: this.state.value,
      view: EDIT,
    });
  }

  render() {
    const { value, parseError } = this.state;
    return (
      <div className={classnames(styles.component)}>
        <div className='message'>
          <p>Paste your data in the box below. <b>Make sure your data includes a header row.</b></p>
        </div>
        <textarea
          value={value}
          onChange={e => this.setState({ value: e.target.value })}
          placeholder='Paste spreadsheet, delimited or JSON data here.'
        />
        {parseError && <div className='level error'>
          <p>
            <b>Uh-oh!</b> We couldn't parse your data. Try pasting it in again?
          </p>
        </div>}
        <div className='level nav'>
          <button
            onClick={this.parseDataString}
            className={classnames('button', {
              'is-disabled': !value,
            })}
            disabled={!value}
          >Next</button>
        </div>
      </div>
    );
  }
}

TextInput.defaultProps = {
  defaultValue: '',
};

export default TextInput;
