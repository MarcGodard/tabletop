import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import './table-top.less';
import view from './table-top.stache';

export const ViewModel = DefineMap.extend({
  modals: {
    value: []
  },
  currentIndex: {
    value: 1
  },
  currentLeft: {
    value: 50
  },
  currentTop: {
    value: 50
  },
  openModal() {
    let tempArr = [].reduce.call(
      this.modals,
      function(a, b) {
        return a.zIndex > b.zIndex ? a : b
      },
      {zIndex: -1}
    );
    this.currentIndex = tempArr.zIndex + 1;
    this.currentLeft = this.currentLeft+25;
    this.currentTop = this.currentTop+25;
    this.modals.push(
      {
        id: Math.floor(Math.random() * 2000),
        zIndex: this.currentIndex,
        left: this.currentLeft,
        top: this.currentTop,
        width: 400,
        height: 200,
        minWidth: 300,
        minHeight: 120,
        maxWidth: 900,
        maxHeight: 800,
        classes: []
      }
    );
  },
  addClass(modal, toAdd) {
    modal.classes.push(toAdd);
    modal.classes = modal.classes.filter((value, index, self) => self.indexOf(value) === index);
  },
  removeClass(modal, toRemove) {
    modal.classes = modal.classes.filter(e => e !== toRemove);
  }
});

export default Component.extend({
  tag: 'table-top',
  ViewModel,
  view,
  events: {
    'mousedown': function (something, event) {
      this.currentModalID = $(event.target).closest(".modal").id;
      let modal = this.viewModel.modals.filter(e => e.id === this.currentModalID)[0];
      let $closestResize = $(event.target).closest(".resize");

      if ($closestResize.hasClass('north-resize')) {
        this.hasNorthResize = true;
        this.startY = event.screenY;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('south-resize')) {
        this.hasSouthResize = true;
        this.startY = event.screenY;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('east-resize')) {
        this.hasEastResize = true;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('west-resize')) {
        this.hasWestResize = true;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('nw-resize')) {
        this.hasNWResize = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('ne-resize')) {
        this.hasNEResize = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('se-resize')) {
        this.hasSEResize = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('sw-resize')) {
        this.hasSWResize = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('drag-modal')) {
        this.hasDragModal = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      }
    },
    'mousemove': function(something, event) {
      let $tabletop = $('.tabletop');
      let modal = this.viewModel.modals.filter(e => e.id === this.currentModalID)[0];
      let newTop, newLeft, newWidth, newHeight;
      let tabletopHeight = $tabletop.height(), tabletopWidth = $tabletop.width();

      if (typeof modal !== 'undefined') {
        if (!modal.maxHeight || modal.maxHeight === 0) modal.maxHeight = tabletopHeight;
        if (!modal.maxWidth || modal.maxWidth === 0) modal.maxWidth = tabletopWidth;

        if (this.hasNorthResize) {
          newTop = modal.top - (this.startY - event.screenY);
          newHeight = modal.height + (this.startY - event.screenY);
          if (newHeight >= modal.minHeight) {
            console.log(newTop);
            modal.top = (newTop > 0 ? (newHeight <= modal.maxHeight ? newTop : modal.top) : 0);
            modal.height = (newHeight <= modal.maxHeight ? (newTop > 0 ? newHeight : modal.height) : modal.maxHeight);
            if (newTop > 0 && newHeight <= modal.maxHeight) this.startY = event.screenY;
          }
        } else if (this.hasSouthResize) {
          newHeight = modal.height - (this.startY - event.screenY);
          if (newHeight >= modal.minHeight) {
            modal.height = (newHeight <= modal.maxHeight ? newHeight : modal.maxHeight);
            if (newHeight <= modal.maxHeight) this.startY = event.screenY;
          }
        } else if (this.hasEastResize) {
          newWidth = modal.width - (this.startX - event.screenX);
          if (newWidth >= modal.minWidth) {
            modal.width = (newWidth <= modal.maxWidth ? newWidth : modal.maxWidth);
            if (newWidth <= modal.maxWidth) this.startX = event.screenX;
          }
        } else if (this.hasWestResize) {
          newLeft = modal.left - (this.startX - event.screenX);
          newWidth = modal.width + (this.startX - event.screenX);
          if (newWidth >= modal.minWidth) {
            modal.left = (newLeft > 0 ? (newWidth <= modal.maxWidth ? newLeft : modal.left) : 0);
            modal.width = (newWidth <= modal.maxWidth ? (newLeft > 0 ? newWidth : modal.width) : modal.maxWidth);
            if (newLeft > 0 && newWidth <= modal.maxWidth) this.startX = event.screenX;
          }
        } else if (this.hasNWResize) {
          newLeft = modal.left - (this.startX - event.screenX);
          newWidth = modal.width + (this.startX - event.screenX);
          newTop = modal.top - (this.startY - event.screenY);
          newHeight = modal.height + (this.startY - event.screenY);
          if (newWidth >= modal.minWidth) {
            modal.left = (newLeft > 0 ? (newWidth <= modal.maxWidth ? newLeft : modal.left) : 0);
            modal.width = (newWidth <= modal.maxWidth ? (newLeft > 0 ? newWidth : modal.width) : modal.maxWidth);
            if (newLeft > 0 && newWidth <= modal.maxWidth) this.startX = event.screenX;
          }
          if (newHeight >= modal.minHeight) {
            modal.top = (newTop > 0 ? (newHeight <= modal.maxHeight ? newTop : modal.top) : 0);
            modal.height = (newHeight <= modal.maxHeight ? (newTop > 0 ? newHeight : modal.height) : modal.maxHeight);
            if (newTop > 0 && newHeight <= modal.maxHeight) this.startY = event.screenY;
          }
        } else if (this.hasNEResize) {
          newWidth = modal.width - (this.startX - event.screenX);
          newTop = modal.top - (this.startY - event.screenY);
          newHeight = modal.height + (this.startY - event.screenY);
          if (newWidth >= modal.minWidth) {
            modal.width = (newWidth <= modal.maxWidth ? newWidth : modal.maxWidth);
            if (newWidth <= modal.maxWidth) this.startX = event.screenX;
          }
          if (newHeight >= modal.minHeight) {
            modal.top = (newTop > 0 ? (newHeight <= modal.maxHeight ? newTop : modal.top) : 0);
            modal.height = (newHeight <= modal.maxHeight ? newHeight : modal.maxHeight);
            if (newTop > 0 && newHeight <= modal.maxHeight) this.startY = event.screenY;
          }
        } else if (this.hasSEResize) {
          newWidth = modal.width - (this.startX - event.screenX);
          newHeight = modal.height - (this.startY - event.screenY);
          if (newWidth >= modal.minWidth) {
            modal.width = (newWidth <= modal.maxWidth ? newWidth : modal.maxWidth);
            if (newWidth <= modal.maxWidth) this.startX = event.screenX;
          }
          if (newHeight >= modal.minHeight) {
            modal.height = (newHeight <= modal.maxHeight ? newHeight : modal.maxHeight);
            if (newHeight <= modal.maxHeight) this.startY = event.screenY;
          }
        } else if (this.hasSWResize) {
          newLeft = modal.left - (this.startX - event.screenX);
          newWidth = modal.width + (this.startX - event.screenX);
          newHeight = modal.height - (this.startY - event.screenY);
          if (newWidth >= modal.minWidth) {
            modal.left = (newLeft > 0 ? (newWidth <= modal.maxWidth ? newLeft : modal.left) : 0);
            modal.width = (newWidth <= modal.maxWidth ? newWidth : modal.maxWidth);
            if (newLeft > 0 && newWidth <= modal.maxWidth) this.startX = event.screenX;
          }
          if (newHeight >= modal.minHeight) {
            modal.height = (newHeight <= modal.maxHeight ? newHeight : modal.maxHeight);
            if (newHeight <= modal.maxHeight) this.startY = event.screenY;
          }
        } else if (this.hasDragModal) {
          newLeft = modal.left - (this.startX - event.screenX);
          newTop = modal.top - (this.startY - event.screenY);

          modal.left = (newLeft > 0 ? newLeft : 0);
          if (newLeft > 0) this.startX = event.screenX;
          modal.top = (newTop > 0 ? newTop : 0);
          if (newTop > 0) this.startY = event.screenY;
        }
      }
    },
    'mouseup': function() {
      let modal = this.viewModel.modals.filter(e => e.id === this.currentModalID)[0];
      if (typeof modal !== 'undefined') this.viewModel.removeClass(modal, 'is-dragging');

      if (this.hasNorthResize) {
        this.hasNorthResize = false;
      } else if (this.hasSouthResize) {
        this.hasSouthResize = false;
      } else if (this.hasEastResize) {
        this.hasEastResize = false;
      } else if (this.hasWestResize) {
        this.hasWestResize = false;
      } else if (this.hasNWResize) {
        this.hasNWResize = false;
      } else if (this.hasNEResize) {
        this.hasNEResize = false;
      } else if (this.hasSEResize) {
        this.hasSEResize = false;
      } else if (this.hasSWResize) {
        this.hasSWResize = false;
      } else if (this.hasDragModal) {
        this.hasDragModal = false;
      }
    },
    'mouseleave': function() {
      let modal = this.viewModel.modals.filter(e => e.id === this.currentModalID)[0];
      if (typeof modal !== 'undefined') this.viewModel.removeClass(modal, 'is-dragging');

      if (this.hasNorthResize) {
        this.hasNorthResize = false;
      } else if (this.hasSouthResize) {
        this.hasSouthResize = false;
      } else if (this.hasEastResize) {
        this.hasEastResize = false;
      } else if (this.hasWestResize) {
        this.hasWestResize = false;
      } else if (this.hasNWResize) {
        this.hasNWResize = false;
      } else if (this.hasNEResize) {
        this.hasNEResize = false;
      } else if (this.hasSEResize) {
        this.hasSEResize = false;
      } else if (this.hasSWResize) {
        this.hasSWResize = false;
      } else if (this.hasDragModal) {
        this.hasDragModal = false;
      }
    }
  }
});
