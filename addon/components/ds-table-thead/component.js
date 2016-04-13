import Ember from 'ember';
import layout from './template';
const { Component, A, computed } = Ember;
export default Component.extend({
    layout,
    tagName: 'thead',
    columns: []
});
