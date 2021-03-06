'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

const tags = !componentsX
  ? [
      {
        type: 'ibm',
        label: 'IBM',
      },
      {
        type: 'beta',
        label: 'Beta',
      },
      {
        type: 'third-party',
        label: 'Third-Party',
      },
      {
        type: 'local',
        label: 'Local',
      },
      {
        type: 'dedicated',
        label: 'Dedicated',
      },
      {
        type: 'custom',
        label: 'Custom',
      },
      {
        type: 'experimental',
        label: 'Experimental',
      },
      {
        type: 'community',
        label: 'Community',
      },
      {
        type: 'private',
        label: 'Private',
      },
    ]
  : [
      {
        type: 'basic',
        label: 'Component',
      },
      {
        type: 'red',
        label: 'Red',
      },
      {
        type: 'magenta',
        label: 'Magenta',
      },
      {
        type: 'purple',
        label: 'Purple',
      },
      {
        type: 'blue',
        label: 'Blue',
      },
      {
        type: 'cyan',
        label: 'Cyan',
      },
      {
        type: 'teal',
        label: 'Teal',
      },
      {
        type: 'green',
        label: 'Green',
      },
      {
        type: 'cool-gray',
        label: 'Cool-Gray',
      },
      {
        type: 'warm-gray',
        label: 'Warm-Gray',
      },
    ];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Tag',
      context: {
        tags,
        componentsX,
      },
    },
  ],
};
