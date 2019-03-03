import React from 'react';
import ReactDOM from 'react-dom';
import DataInput from './index';
import Page from 'Common/Page/';
import CodeBlock from 'Common/CodeBlock';

const App = (props) => (
  <Page title='DataInput'>
    <DataInput />
    <CodeBlock
      value={`import { DataInput } from 'chartwerk-ui-components';

<DataInput
  dateFormats={['M/D/YY', 'MM/DD/YY']}
/>
      `}
    />
  </Page>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
