import Ember from 'ember';
const { Mixin } = Ember;
export default Mixin.create({
    events: [
        'touchStart',
        'touchMove',
        'touchEnd',
        'touchCancel',
        'mouseDown',
        'mouseUp',
        'contextMenu',
        'click',
        'doubleClick',
        'mouseMove',
        'focusIn',
        'focusOut',
        'mouseEnter',
        'mouseLeave',
        'dragStart',
        'drag',
        'dragEnter',
        'dragLeave',
        'dragOver',
        'dragEnd',
        'drop'
    ],
    didReceiveAttrs() {
        this.events.forEach(e => {
            let action = this.get(e);
            if(action) {
                this.set(e, event => {
                    this.sendAction(e, event, this.get('record'));
                });
            }
        });
    }
});
