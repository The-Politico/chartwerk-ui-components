import React from 'react';
import ReactDOM from 'react-dom';
import DataInput from './index';
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
  prompt: 'Which columns have nothing in them of use to you?',
  members: 0,
}];

const App = (props) => (
  <Page title='DataInput'>
    <DataInput
      dataMapPrompts={prompts}
      updateDataInput={(dataInput) => {
        console.log('Here\'s your data!', dataInput);
      }}
    />
    <CodeBlock
      value={`import { DataInput } from 'chartwerk-ui-components';

<DataInput
  dateFormats={['M/D/YY', 'MM/DD/YY']}
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
  updateDataInput={(dataInput) => {
    console.log('Your data!', dataInput);
  }}
/>
      `}
    />
  </Page>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
