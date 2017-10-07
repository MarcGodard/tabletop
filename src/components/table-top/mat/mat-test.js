import QUnit from 'steal-qunit';
import { ViewModel } from './mat';

// ViewModel unit tests
QUnit.module('tabletop/components/table-top/mat');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the table-mat component');
});
