import Ember from 'ember';
import Events from '../../mixins/events';
import layout from './template';
const { Component } = Ember;
export default Component.extend(Events, {
    layout,
    tagName: 'tr',
    columns: [],
    record: {}
});
