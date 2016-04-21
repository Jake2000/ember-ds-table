import Ember from 'ember';
import layout from './template';
const { Component, computed: { lte } } = Ember;
export default Component.extend({
    layout,
    tagName: 'tbody',
    count: 0,
    isEmpty: lte('count', 0)
});
