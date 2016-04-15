import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ds-table-loading', 'Integration | Component | ds table loading', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ds-table-loading}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ds-table-loading}}
      template block text
    {{/ds-table-loading}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
