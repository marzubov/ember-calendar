/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-calendar',

  included: function(app) {
    this._super.included(app);

    var options = app.options.emberCalendar || {};

    if (!('includeFontAwesomeAssets' in options)) {
      options.includeFontAwesomeAssets = true;
    }

    app.import(path.join(app.bowerDirectory, 'interact/dist/interact.js'));

    if (options.includeFontAwesomeAssets) {
      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.ttf'), {
        destDir: 'fonts'
      });

      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.woff'), {
        destDir: 'fonts'
      });

      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.woff2'), {
        destDir: 'fonts'
      });

      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.svg'), {
        destDir: 'fonts'
      });

      app.import(path.join(app.bowerDirectory, 'fontawesome/fonts/fontawesome-webfont.eot'), {
        destDir: 'fonts'
      });
    }

    app.import('vendor/ember-calendar/interact.js', {
      type: 'vendor',
      exports: { 'interact': ['default'] }
    });

    if (app.env === 'test') {
      app.import(path.join(app.bowerDirectory, 'jquery-simulate/jquery.simulate.js'), {
        type: 'test'
      });
    }
  }
};
