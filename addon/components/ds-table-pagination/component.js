import Ember from 'ember';
import layout from './template';
const { Component, computed, observer } = Ember;
const { round } = Math;
export default Component.extend({
    layout,
    countRecords: 0,
    limit: 10,
    skip: 0,
    current: 1,
    count: computed('countRecords', 'limit', function() {
        let { limit, countRecords } = this.getProperties('limit', 'countRecords');
        const count = round(countRecords / limit);
        return count < 1 ? count + 1 : count;
    }),
    _observeCurrent: observer('current', 'count', 'limit', function() {
        let { limit, current, count } = this.getProperties('limit', 'current', 'count');
        current = parseInt(current);
        current = current >= 1 ? current : 1;
        current = current > count ? count : current;
        let skip = limit * (current - 1);

        this.attrs.skip.update(skip);
        this.attrs.current.update(current);
    })
});
