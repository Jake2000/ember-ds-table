var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
    var app = new EmberAddon(defaults, {
        minifyJS: {
            enabled: true
        },
        minifyCSS: {
            enabled: true
        }
    });
    return app.toTree();
};
