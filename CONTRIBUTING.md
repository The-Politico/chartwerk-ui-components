![](https://www.politico.com/interactives/cdn/images/badge.svg)

# Contributing UI components

## Style guide

#### Module structure

Each component module should be created inside a folder within `src/components`.


```
src/
  components/
    MyNewComponent/
      index.js
```

Your component's root `index.js` should export a single default, which is your UI component.


```javascript
class MyComponent extends React.Component {
  // ...
}

export default MyComponent;
```

Always add your component to `src/index.js`:

```javascript
// Other components...
export { default as MyNewComponent } from './components/MyNewComponent/index.js';
```

#### Component props

Remember every UI component is designed to be used with others in a template UI app.

A UI component should always have at least **two** props.

As an example, consider a simple color picker component. Imagine `UIAppState` represents the state of the template UI app using your component:

```javascript
const UIAppState = { color: 'blue' };

const updateColor = (newColor) => { UIAppState.color = newColor; };

<MyColorPickerComponent
  color={UIAppState.color}
  updateColor={updateColor}
/>
```

Prop 1. **Config data**

  A prop that represents the configuration data your component will supply. This data can be whatever shape your component needs. In the case of our color picker, it's just a string representing the color.

  This data should also be used to re-initialize your component, say, from data saved to a database.

  Usually, this data will be added to a state object in a template UI app with the config from other UI components. It's helpful to name your prop after a unique key name that corresponds to your component, like we did for `color`.



Prop 2. **Update function**

  Your component should require a function that can be used in a template UI app to update the config data your component supplies. Your component should call that function passing its config data as the first and only parameter.

  It's up to your component to decide when to call the update function, however you should also consider that calling it will likely trigger a rerender of the template UI app _and_ a redraw of the chart. Think about using internal state in your component to contain incremental data edits until a user is ready to redraw the chart. At the very least, be sure to throttle or debounce the function if it'll be called frequently.

#### Styles

Use CSS modules to scope all styles to your component. These will be compiled into a single stylesheet, with hashed generated for your rules and component class names, when you build your project.

The build process automatically adds an import to your component's compiled stylesheet so importing your component also automatically imports its stylesheet as long as the user has a CSS loader configured. (We can expect that config when template app builders work with our UI starter.)
