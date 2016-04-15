import Ember from 'ember';
import layout from './template';
const { Component, computed, observer } = Ember;
export default Component.extend({
    layout,
    countRecords: 0,
    skip: 0,
    limit: 10,
    current: 1,
    count: computed('countRecords', 'limit', function() {
        let { limit, countRecords } = this.getProperties('limit', 'countRecords');
        const count = countRecords / limit;
        return (0 === count % 1) ? count : (Math.floor(count) + 1);
    }),
    _updateLimit: observer('current', function() {
        let { limit, current } = this.getProperties('limit', 'current');
        this.set('skip', limit * (current - 1));
    })
});
