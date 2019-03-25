import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.scss';

import { EDIT } from '../constants/views';

import { parseToTypes, parseToStrings } from '../utils/parseDataString';
import { parseMajorityType } from '../utils/parsers';
import explicitlyType from '../utils/explicitType';
import { zipDataCollections } from '../utils/zippers';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      parseError: false,
      parsing: false,
    };
  }

  startParsing = () => {
    this.setState({ parsing: true });
    setTimeout(this.parseDataString, 500);
  }

  parseDataString = () => {
    this.setState({ parseError: false });
    const { sendState } = this.props;
    const stringData = parseToStrings(this.state.value);
    let parsedData = parseToTypes(this.state.value);
    if (!parsedData) {
      this.setState({ parseError: true, parsing: false });
      return;
    }
    const columns = {};
    const columnsArray = parsedData.columns.slice();
    columnsArray.forEach((column, i) => {
      const { majorityType, unanimous } = parseMajorityType(parsedData.map(obj => obj[column]));
      columns[column] = {
        order: i,
        type: majorityType,
        transform: {},
        annotate: {},
      };
      if (!unanimous) {
        parsedData = explicitlyType(parsedData, stringData, column, majorityType);
      }
    });

    const data = zipDataCollections(stringData, parsedData);

    sendState({
      data,
      columns,
      blob: this.state.value,
      view: EDIT,
    });
  }

  render() {
    const { value, parseError, parsing } = this.state;
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
            onClick={this.startParsing}
            className={classnames('button', {
              'is-disabled': !value,
            })}
            disabled={!value}
          >
            Next
          </button>

          {parsing &&
            <FontAwesomeIcon
              icon={faCog}
              size='lg'
              fixedWidth
              spin
              hidden={!parsing}
            />
          }
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  defaultValue: '',
};

Input.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  sendState: PropTypes.func.isRequired,
};

export default Input;
