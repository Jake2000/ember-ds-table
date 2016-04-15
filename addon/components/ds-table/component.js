import Ember from 'ember';
import DS from 'ember-data';

import layout from './template';

const {
    Component,
    A,
    computed,
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
    reload: false,
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
        });
    })
});
