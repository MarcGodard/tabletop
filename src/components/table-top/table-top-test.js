import QUnit from 'steal-qunit';
import { ViewModel } from './table-top';

// ViewModel unit tests
QUnit.module('tabletop/components/table-top');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the table-top component');
});
