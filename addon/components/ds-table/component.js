import Ember from 'ember';
import DS from 'ember-data';

import layout from './template';

const {
    Component,
    A,
    computed,
    observer,
    inject: {
        service
    },
    isNone
} = Ember;

const O = Ember.Object;

export default Component.extend({
    layout,
    tagName: 'table',
    store: service(),
    modelName: '',
    columns: [],
    skip: 0,
    limit: 10,
    count: 0,
    currentPage: 1,
    countPages: 1,
    reload: false,
    loading: false,
    messages: {
        emptyTable: 'nothing found',
        loading:    'loading...'
    },
    _observeCurrentPage: observer('currentPage', 'count', 'limit', function() {
        let {
            limit,
            currentPage,
            count
        } = this.getProperties('limit', 'currentPage', 'count');

        let countPages = parseInt(count / limit);
        countPages = countPages < 1 ? countPages + 1 : countPages;

        currentPage = parseInt(currentPage);
        currentPage = currentPage >= 1 ? currentPage : 1;
        currentPage = currentPage > countPages ? countPages : currentPage;

        limit = parseInt(limit);
        limit = limit >= 0 ? limit : 0;
        limit = limit > count ? count : limit;

        let skip = limit * (currentPage - 1);
        this.setProperties({
            skip, limit, currentPage, countPages
        });
    }),
    didReceiveAttrs() {
        //columns
        let columns = A(this.get('columns')), ret = A([]);
        columns.forEach(item => {
            item = O.create(item);
            if(isNone(item.get('isVisible'))) {
                item.set('isVisible', true);
            }
            ret.addObject(item);
        });
        columns.replace(0, columns.length, ret);
    },
    model: computed('reload', 'skip', 'limit', function() {
        this.set('loading', true);
        let reload = this.get('reload');
        if(reload) {
            this.set('currentPage', 1);
        }

        const {
            store,
            modelName,
            skip,
            limit
        } = this.getProperties('store', 'modelName', 'skip', 'limit');
        return DS.PromiseArray.create({
            promise: store.query(modelName, { skip: skip, limit: limit })
                .then(result => {
                    let count = result.get('meta.count');
                    this.set('count', count ? count : 0);
                    return result;
                })
                .finally(() => {
                    this.setProperties({
                        reload:  false,
                        loading: false
                    });
                })
        });
    })
});
