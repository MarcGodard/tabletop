import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import './mat.less';
import view from './mat.stache';

export const ViewModel = DefineMap.extend({
  title: {
    value: 'Title of Modal'
  },
  classes: {
    value: []
  },
  modals: {
    type: 'any'
  },
  modal: {
    type: 'any'
  },
  openModal() {
    this.modal.classes = this.modal.classes.filter(e => e !== 'closing');
    this.modal.classes.push('opening');
  },
  closeModal() {
    this.modal.classes = this.modal.classes.filter(e => e !== 'opening');
    this.modal.classes.push('closing');
    setTimeout(() => this.modals = this.modals.filter(e => e.id !== this.modal.id), 300);
  },
  focusModal() {
    let tempArr = [].reduce.call(
      this.modals,
      function(a, b) {
        return a.zIndex > b.zIndex ? a : b
      },
      {zIndex: -1}
    );
    this.modal.zIndex = tempArr.zIndex + 1;
  }
});

export default Component.extend({
  tag: 'table-mat',
  ViewModel,
  view
});
