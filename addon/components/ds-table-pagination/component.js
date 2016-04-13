import Ember from 'ember';
import layout from './template';
const { Component, computed, observer } = Ember;
export default Component.extend({
    layout,
    count: 0,
    currentPageNumber: 1,
    skip: 0,
    limit: 10,
    gotoBackEnabled: computed.gt('currentPageNumber', 1),
    gotoForwardEnabled: computed('skip', 'count', function () {
        return this.get('currentPageNumber') * this.get('limit') < this.get('count');
    }),
    pagesCount: computed('count', 'limit', function() {
        const pagesCount = this.get('count') / this.get('limit');
        return (0 === pagesCount % 1) ? pagesCount : (Math.floor(pagesCount) + 1);
    }),
    _setupPaginationQueryParams: observer('limit', 'currentPageNumber', function() {
        const {
            limit,
            currentPageNumber
        } = this.getProperties('limit', 'currentPageNumber');

        const skip = limit * (currentPageNumber - 1);
        this.setProperties({
          skip: skip,
          limit: limit
        });
    }),
    actions: {
        gotoFirstPage() {
            this.set('currentPageNumber', 1);
        },

        gotoPrevPage() {
            if (this.get('currentPageNumber') > 1) {
                this.decrementProperty('currentPageNumber');
            }
        },
        gotoNextPage() {
            let {
                currentPageNumber,
                limit,
                count
            } = this.getProperties('currentPageNumber', 'limit', 'count');
            if (count > limit * (currentPageNumber - 1)) {
                this.incrementProperty('currentPageNumber');
            }
        },
        gotoLastPage() {
            this.set('currentPageNumber', this.get('pagesCount'));
        }
    }
});
