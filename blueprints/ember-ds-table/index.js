module.exports = {
    normalizeEntityName: function() {},
    afterInstall: function() {
        var _this = this;
        return this.addAddonToProject('ember-cli-mirage').then(function() {
            return  _this.addAddonToProject('ember-truth-helpers').then(function() {
                return  _this.addAddonToProject('ember-math-helpers').then(function() {
                    return  _this.addAddonToProject('pagination-pager');
                });
            });
        });
    }
};
