import Ember from 'ember';
import layout from './template';
const { Component } = Ember;
export default Component.extend({
    layout,
    tagName: 'a',
    classNameBindings: [
        'enabled:enabled:disabled'
    ],
    enabled: false,
    click(e) {
        this.sendAction('onclick', e);
    }
});
