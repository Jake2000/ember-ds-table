import Ember from 'ember';
import DS from 'ember-data';

import layout from './template';

const {
    Component,
    computed,
    inject: {
        service
    },
    isNone
} = Ember;

export default Component.extend({
    layout,
    tagName: 'table',
    store: service(),
    modelName: '',
    filter: {
        skip: 0,
        limit: 10
    },
    meta: {},
    reload: false,
    didReceiveAttrs() {
        let columns = this.get('columns');
        columns.forEach(item => {
            let isVisible = item.get('isVisible');
            if(isNone(isVisible)) {
                item.set('isVisible', true);
            }
        });
    },
    model: computed('reload', 'filter.{skip,limit}', function() {
        const {
            store,
            modelName,
            filter
        } = this.getProperties('store', 'modelName', 'filter');
        return DS.PromiseArray.create({
            promise: store.query(modelName, { filter: filter })
                .then(result => {
                    this.set('meta', result.get('meta'));
                    return result;
                })
        });
    })
});
