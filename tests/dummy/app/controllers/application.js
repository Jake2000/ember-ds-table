import Ember from 'ember';
const { Controller, A } = Ember;

export default Controller.extend({
    columns: A([
        Ember.Object.create({
            path: 'id',
            title: '#',
            isVisible: false
        }),
        Ember.Object.create({
            path: 'title',
            title: 'Наименование'
        })
    ])
});
