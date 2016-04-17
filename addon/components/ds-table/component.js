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
    limit: 10,
    count: 0,
    currentPage: 1,
    reload: false,
    loading: false,
    countPages: computed('count', 'limit', {
        get() {
            let {
                count, limit
            } = this.getProperties('count', 'limit');
            let countPages = parseInt(count / limit);
            return countPages > 0 ? countPages : countPages + 1;
        }
    }),
    skip: computed('currentPage', 'limit', {
        get() {
            let {
                currentPage, limit
            } = this.getProperties('currentPage', 'limit');
            return limit * (currentPage - 1);
        }
    }),
    _observeReload: observer('reload', function() {
        let reload = this.get('reload');
        if(reload) {
            this.set('currentPage', 1);
        }
    }),
    didReceiveAttrs() {
        let columns = this.get('columns'), ret = A([]);
        columns = A(columns);
        columns.forEach(item => {
            item = O.create(item);
            if(isNone(item.get('isVisible'))) {
                item.set('isVisible', true);
            }
            ret.addObject(item);
        });
        columns.replace(0, columns.length, ret);
        console.log('didReceiveAttrs', columns);
    },
    didUpdateAttrs() {
        let {
            countPages, currentPage
        } = this.getProperties('countPages', 'currentPage');
        currentPage = parseInt(this.get('currentPage'));
        currentPage = currentPage >= 1 ? currentPage : 1;
        currentPage = currentPage > countPages ? countPages : currentPage;
        this.set('currentPage', currentPage);
    },
    query: computed('skip', 'limit', {
        get() {
            return this.getProperties('skip', 'limit');
        }
    }),
    model: computed('reload', 'query', function() {
        this.set('loading', true);
        let {
            store,
            modelName,
            query
        } = this.getProperties('store', 'modelName', 'query');
        return DS.PromiseArray.create({
            promise: store.query(modelName, query)
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
