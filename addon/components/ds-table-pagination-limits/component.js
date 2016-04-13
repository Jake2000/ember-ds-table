import Ember from 'ember';
import layout from './template';
const { Component, A, computed } = Ember;
export default Component.extend({
    layout,
    limits: new A([10, 25, 50]),
    limit: computed('limits.[]', function() {
        return this.get('limits.firstObject');
    }),
    actions: {
        
    }
});
