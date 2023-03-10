const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
  },
  localePath: path.resolve('./public/locales'),
};