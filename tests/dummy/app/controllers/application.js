import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
    columns:  [
        {
            title: '#',
            path: 'id'
        },
        {
            title: 'Avatar',
            path: 'avatar',
            component: 'user-avatar'
        },
        {
            title: 'First Name',
            path: 'firstName'
        },
        {
            title: 'Last Name',
            path: 'lastName'
        },
        {
            title: 'Address',
            path: 'address'
        },
        {
            title: 'State',
            path: 'state'
        },
        {
            title: 'Country',
            path: 'country'
        }
    ],
    reload: false,
    currentPage: 1,
    updateCurrentPage: 1,
    limit: 10,
    count: 0,
    actions: {
        goTo(value) {
            this.set('currentPage', value);
        },
        reload() {
            this.set('reload', true);
        }
    }
});
