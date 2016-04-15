import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
    columns: [
        {
            path: 'id',
            title: '#',
            isVisible: false
        },
        {
            path: 'title',
            title: 'Наименование'
        }
    ],
    reload: false,
    actions: {
        doubleClick(e, row) {
            console.log(e, row);
        },
        reload() {
            this.set('reload', true);
        }
    }
});
