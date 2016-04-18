import Ember from 'ember';
import layout from './template';

const {
    Component,
    A,
    computed,
    computed: {
        alias
    },
    inject: {
        service
    },
    isNone,
    assign,
    ArrayProxy,
    PromiseProxyMixin
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
    query: {},
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
    },
    didUpdateAttrs() {
        let {
            countPages, currentPage, reload
        } = this.getProperties('countPages', 'currentPage', 'reload');
        currentPage = reload ? 1 : currentPage;
        currentPage = parseInt(currentPage);
        currentPage = currentPage >= 1 ? currentPage : 1;
        currentPage = currentPage > countPages ? countPages : currentPage;
        this.set('currentPage', currentPage);
    },
    content: alias('model.content'),
    model: computed('reload', 'skip', 'limit', 'query', function() {
        this.set('loading', true);
        let {
            store, modelName, query
        } = this.getProperties('store', 'modelName', 'query');
        query = assign(query || {}, this.getProperties('skip', 'limit'));
        let ArrayPromise = ArrayProxy.extend(PromiseProxyMixin);
        return ArrayPromise.create({
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
