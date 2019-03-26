import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'Common/Page/';
import CodeBlock from 'Common/CodeBlock';

import Chatter from './index';

class App extends React.Component {
  state = {
    chatter: {
      headline: 'An example headline',
      description: '',
      source: '',
    },
  }

  render() {
    return (
      <Page title='Chatter'>
        <Chatter
          chatter={this.state.chatter}
          inputProps={{
            description: {
              label: 'Description',
              maxLength: 200,
              textarea: true,
              markdownHints: true,
            },
            source: {
              label: 'Source',
              placeholder: 'data source',
              maxLength: 100,
            },
          }}
          updateChatter={(chatter) => this.setState({ chatter })}
        />
        <CodeBlock
          value={`import { Chatter } from 'chartwerk-ui-components';

let chatter = {
  headline: '',
  description: '',
  source: '',
};

const inputProps = {
  description: {
    label: 'Description',
    maxLength: 200,
    textarea: true,
    markdownHints: true,
  },
  source: {
    label: 'Source',
    placeholder: 'data source',
    maxLength: 100,
  },
};

<Chatter
  chatter={chatter}
  inputProps={inputProps}
  updateChatter={(newChatter) => chatter = newChatter}
  updateDebounce={250}
/>
        `}
        />
      </Page>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
