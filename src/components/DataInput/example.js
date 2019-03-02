import React from 'react';
import ReactDOM from 'react-dom';
import DataInput from './index';
import Page from 'Common/Page/';

const App = (props) => (
  <Page title='DataInput'>
    <DataInput />
  </Page>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
