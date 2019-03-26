import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT, EDIT, MAP, PREVIEW } from './constants/views';

import parseDates from './utils/parseDates';

import Input from './Input';
import Edit from './Edit';
import Map from './Map';
import Preview from './Preview';

class Data extends React.Component {
  constructor(props) {
    super(props);
    const view = props.data.data.length > 0 ? PREVIEW : INPUT;
    this.state = Object.assign({ view }, parseDates(props.data));
  }

  sendState = (newState) => this.setState(newState)

  updateMap = (newMap) => this.setState(state => (
    { map: Object.assign(state.map, newMap) }
  ));

  updateContext = () => {
    const { blob, data, columns, map } = this.state;

    this.props.updateData({ blob, data, columns, map });
  }

  render() {
    const { mapPrompts } = this.props;
    const { view, blob, data, columns, map } = this.state;
    return (
      <div className={classnames(styles.component)}>
        {view === INPUT && (
          <Input
            defaultValue={blob}
            sendState={this.sendState}
          />
        )}
        {view === EDIT && (
          <Edit
            data={data}
            columns={columns}
            sendState={this.sendState}
          />
        )}
        {view === MAP && (
          <Map
            map={map}
            updateMap={this.updateMap}
            prompts={mapPrompts}
            columns={columns}
            sendState={this.sendState}
            updateContext={this.updateContext}
          />
        )}
        {view === PREVIEW && (
          <Preview
            data={data}
            columns={columns}
            sendState={this.sendState}
          />
        )}
      </div>
    );
  }
}

Data.defaultProps = {
  data: {
    view: INPUT,
    blob: '',
    data: [],
    columns: {},
    map: {},
  },
};

Data.propTypes = {
  data: PropTypes.shape({
    view: PropTypes.string.isRequried,
    blob: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired,
    map: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
  }),
  updateData: PropTypes.func.isRequired,
  mapPrompts: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    members: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['date', 'number', 'string']),
    required: PropTypes.bool,
  })),
};

export default Data;
