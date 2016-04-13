import REST from 'ember-data/adapters/rest';

export default REST.extend({
    //host: 'http://fada.ru',
    host: 'http://localhost:8000',
    namespace: 'api'
});
