import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'tabletop/models/test';

import 'tabletop/components/table-top/table-top-test';

import 'tabletop/components/table-top/mat/mat-test';

F.attach(QUnit);

QUnit.module('tabletop functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('tabletop main page shows up', function() {
  F('title').text('tabletop', 'Title is set');
});
