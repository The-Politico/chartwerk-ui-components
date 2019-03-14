import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { EDIT } from '../constants/views';

import { parseToTypes, parseToStrings } from '../utils/parseDataString';
import { parseMajorityType } from '../utils/parsers';
import explicitlyType from '../utils/explicitType';

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
    const stringData = parseToStrings(this.state.value);
    let typedData = parseToTypes(this.state.value);
    if (!typedData) {
      this.setState({ parseError: true });
      return;
    }
    const columnTypes = {};
    const columns = typedData.columns.slice();
    columns.forEach(column => {
      const { majorityType, unanimous } = parseMajorityType(typedData.map(obj => obj[column]));
      columnTypes[column] = majorityType;
      if (!unanimous) {
        typedData = explicitlyType(typedData, stringData, column, majorityType);
      }
    });
    sendState({
      stringData,
      typedData,
      columnTypes,
      columnTransforms: {},
      dataMap: {},
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
          placeholder='Paste spreadsheet or comma, tab or pipe separated data here.'
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
