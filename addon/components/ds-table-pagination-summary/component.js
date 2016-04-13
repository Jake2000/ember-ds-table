import Ember from 'ember';
import layout from './template';
const { Component, computed } = Ember;
export default Component.extend({
    layout,
    currentPageNumber: 1,
    limit: 10,
    count: 0,
    summary: computed('currentPageNumber', 'limit', 'count', function() {
        let {
            currentPageNumber,
            limit,
            count
        } = this.getProperties('currentPageNumber', 'limit', 'count');
        return `${currentPageNumber * limit - limit} - ${currentPageNumber * limit} из ${count}`;
    })
});
