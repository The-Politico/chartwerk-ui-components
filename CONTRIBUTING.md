![](https://www.politico.com/interactives/cdn/images/badge.svg)

# Contributing UI components

### Style guide

You should make your Chartwerk UI components so they can be easily assembled into a parent application designed specifically for each chart template. That parent application will manage a single state object which represents all the configuration data a chart needs to draw.

In general, a component should always have at least two properties:
1. A property that represents the configuration data your component will create.
2. A function that gets called with the configuration data that can be used to update the parent application's state.

For example, here's a basic color picker component. Imagine `chartConfigData` represents the state of our parent application:

```javascript
const chartConfigData = { color: 'blue' };

const updateColor = (newColor) => { chartConfigData.color = newColor; };

<MyColorPickerComponent
  color={chartConfigData.color}
  updateColor={updateColor}
/>
```
