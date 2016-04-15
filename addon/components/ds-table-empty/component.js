import Ember from 'ember';
import layout from './template';
const { Component, computed: { lte } } = Ember;
export default Component.extend({
    layout,
    count: 0,
    loading: false,
    isEmpty: lte('count', 0)
});
