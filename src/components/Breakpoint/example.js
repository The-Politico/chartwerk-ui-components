import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'Common/Page/';
import CodeBlock from 'Common/CodeBlock';

import Breakpoint from './index';
import Preview from './Preview';

class App extends React.Component {
  state = {
    breakpoint: 290,
  }

  render() {
    return (
      <Page title='Breakpoint'>
        <Breakpoint
          breakpoint={this.state.breakpoint}
          breakpoints={[290, 350, 600]}
          updateBreakpoint={breakpoint => this.setState({ breakpoint })}
        >
          <Preview />
        </Breakpoint>
        <CodeBlock
          value={`import { Breakpoint } from 'chartwerk-ui-components';

let activeBreakpoint = 290;

<Breakpoint
  breakpoint={activeBreakpoint}
  updateBreakpoint={(breakpoint) => { activeBreakpoint = breakpoint; }}
  breakpoints={[290, 350, 600]}
>
  {/* Your preview will be bounded by a div with
  a width of the current breakpoint! */}
  <Preview />
</Breakpoint>
          `}
        />
      </Page>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
