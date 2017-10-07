import DefineMap from 'can-define/map/map';
import route from 'can-route';
import 'can-route-pushstate';

const AppViewModel = DefineMap.extend({
  message: {
    value: 'Hello World!',
    serialize: false
  },
  title: {
    value: 'tabletop',
    serialize: false
  }
});

export default AppViewModel;
