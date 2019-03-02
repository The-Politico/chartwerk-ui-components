import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'Common/Page/';

import Tabs from './index';

const One = () => (<h4 key={'1'}>A component</h4>);
const Two = () => (
  <h4 key={'2'}>
    <a href='/' onClick={(e) => {
      e.preventDefault();
      window.alert('I has behavior');
    }}>A second component</a>
  </h4>
);

const components = [
  [<One />],
  [<One />, <Two />],
];

const App = (props) => (
  <Page title='Tabs'>
    <Tabs tabs={['One', 'Two']} components={components} />
  </Page>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
