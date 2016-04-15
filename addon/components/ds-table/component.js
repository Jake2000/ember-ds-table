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
    meta: {
        count: 0
    },
    currentPage: 1,
    reload: false,
    loading: true,
    messages: {
        emptyTable: 'nothing found',
        loading:    'loading...'
    },
    _observeLimit: observer('limit', function() {
        let {
            limit,
            count
        } = this.getProperties('limit', 'meta.count');
        limit = parseInt(limit);
        limit = limit >= 0 ? limit : 0;
        limit = limit > count ? count : limit;

        this.set('limit', limit);
    }),
    _observeReload: observer('reload', function() {
        let reload = this.get('reload');
        if(reload) {
            this.set('currentPage', 1);
        }
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
        //meta
        this.set('meta', O.create(this.get('meta')));
    },
    model: computed('reload', 'skip', 'limit', function() {
        this.set('loading', true);
        const {
            store,
            modelName,
            skip,
            limit
        } = this.getProperties('store', 'modelName', 'skip', 'limit');
        return DS.PromiseArray.create({
            promise: store.query(modelName, { filter: { skip: skip, limit: limit } })
                .then(result => {
                    this.set('meta.count', result.get('meta.count'));
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
