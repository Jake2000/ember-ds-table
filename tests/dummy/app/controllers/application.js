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
    actions: {
        doubleClick(e, row) {
            console.log(e, row);
        },
        reload() {
            this.set('reload', true);
        }
    }
});
