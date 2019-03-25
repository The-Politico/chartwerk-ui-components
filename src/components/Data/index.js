import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import { INPUT, EDIT, MAP, PREVIEW } from './constants/views';

import Input from './Input';
import Edit from './Edit';
import Map from './Map';
import Preview from './Preview';

import Transformer from './utils/number/transformer';

/**
 * {
 *    view: INPUT,
 *    blob: '',
 *    data: [
 *      {
 *        columnName: {
 *          raw: '1.2',
 *          parsed: 1.2,
 *          transformed: 120,
 *          annotated: '120%',
 *        }
 *      }
 *    ],
 *    columns: {
 *      columnName: {
 *        order: 0,
 *        type: 'number',
 *        transform: {},
 *        annotate: {},
 *      }
 *    }
 *    map: {},
 * }
 */

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.data);
  }

  sendState = (newState) => this.setState(newState)

  updateMap = (newMap) => this.setState(state => (
    { map: Object.assign(state.map, newMap) }
  ));

  updateContext = () => {
    const { typedData: data, columnTypes, columnTransforms, map } = this.state;

    const transformers = {};

    Object.keys(columnTransforms).forEach((column) => {
      transformers[column] = new Transformer(columnTransforms[column]);
    });

    this.props.updateData({
      data,
      map,
      columnTypes,
      transformers,
    });
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
    map: PropTypes.objectOf(PropTypes.string).isRequired,
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
