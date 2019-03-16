import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import styles from './styles.scss';

import Input from './Input';
import TextArea from './TextArea';

class Chatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatter: props.chatter || {},
    };
    this.debouncedUpdate = debounce(this.debouncedUpdate, props.updateDebounce);
  }
  update = (updateObj) => {
    const { chatter } = this.state;
    const updatedChatter = Object.assign({}, chatter, updateObj);
    this.setState({ chatter: updatedChatter });
    this.debouncedUpdate();
  }

  debouncedUpdate = () => {
    const { updateChatter } = this.props;
    const { chatter } = this.state;
    updateChatter(chatter);
  }

  render() {
    const { inputProps } = this.props;
    const { chatter } = this.state;
    const Inputs = Object.keys(chatter).map((key) => {
      const props = inputProps[key] || {};
      return props.textarea ? (
        <TextArea
          inputKey={key}
          value={chatter[key]}
          update={this.update}
          {...(inputProps[key] || {})}
          key={key}
        />
      ) : (
        <Input
          inputKey={key}
          value={chatter[key]}
          update={this.update}
          {...(inputProps[key] || {})}
          key={key}
        />
      );
    });
    return (
      <div className={classnames(styles.component)}>
        {Inputs}
      </div>
    );
  }
}

Chatter.defaultProps = {
  inputProps: {},
  updateDebounce: 250,
};

Chatter.propTypes = {
  inputProps: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
      maxLength: PropTypes.number,
      textarea: PropTypes.bool,
    })
  ),
  chatter: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  updateChatter: PropTypes.func.isRequired,
  updateDebounce: PropTypes.number,
};

export default Chatter;
