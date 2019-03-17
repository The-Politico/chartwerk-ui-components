import React from 'react';
import ReactDOM from 'react-dom';
import Data from './index';
import Page from 'Common/Page/';
import CodeBlock from 'Common/CodeBlock';

const prompts = [{
  key: 'base',
  prompt: 'Which column has dates in it?',
  type: 'date',
  members: 1,
  required: true,
}, {
  key: 'value',
  prompt: 'Which columns have the values you want to show?',
  type: 'number',
  members: 2,
  required: true,
}, {
  key: 'extra',
  prompt: 'Which columns are extra?',
  members: 0,
}];

const App = (props) => (
  <Page title='Data'>
    <Data
      dataMapPrompts={prompts}
      updateData={(data) => {
        console.log('Here\'s your data!', data);
      }}
    />
    <CodeBlock
      value={`import { Data } from 'chartwerk-ui-components';

<Data
  dataMapPrompts={[{
    key: 'base',
    prompt: 'Which column has dates in it?',
    type: 'date',
    members: 1,
    required: true,
  }, {
    key: 'extras',
    prompt: 'Which columns are extra?',
    members: 0,
  }]}
  updateData={(data) => {
    console.log('Your parsed data, transforms and data map!', data);
  }}
/>
      `}
    />
  </Page>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
