/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var self = this;

    return self.addAddonsToProject({
      packages: [{ name: 'ember-moment', target: '6.0.0' }]
    }).then(function() {
      return self.addPackagesToProject([
        { name: 'ember-cli-sass', target: '5.3.1' },
        { name: 'ember-component-inbound-actions', target: '0.0.4' }
      ]);
    }).then(function() {
      return self.addBowerPackagesToProject([
        { name: 'interact', target: 'unstable' },
        { name: 'jquery-simulate', target: '1.0.1' },
        { name: 'fontawesome', target: '~4.5.0'}
      ]);
    });
  }
};
