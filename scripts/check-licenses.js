const licenses = require('../licences.json');
const pp = (json) => JSON.stringify(json, null, 2);
const NL = '\n';

// This is a list of acceptable licenses;
// Entries may need to be comma separated, e.g. "MIT,Apache2"
var whitelist = [
  'ISC',
  'MIT',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'BSD-4-Clause',
  'MIT*',
  'BSD',
  'AFLv2.1,BSD',
  'Public Domain',
  'MIT/X11',
  '(WTFPL OR MIT)',
  'MIT,Apache2',
  '(BSD-2-Clause OR MIT OR Apache-2.0)',
  'Apache License, Version 2.0',
  '(MIT AND CC-BY-3.0)',
  'Unlicense',
  'MIT / http://rem.mit-license.org',
  'WTFPL'
];

var exceptions = {
  "cosmos-deploy@3.1.2": {
    "reason": "Not required, acceptable use for BBC internal deployments"
  },
  "cycle@1.0.3": {
    "reason": "Public Domain; see: https://github.com/dscape/cycle/"
  },
  "map-stream@0.1.0": {
    "reason": "MIT License; see: https://github.com/dominictarr/map-stream"
  },
  "pm2@2.4.0": {
    "reason": "A-GPL, but acceptable use as a process runner"
  }
};

function inWhitelist(licenseString) {
  return whitelist.includes(licenseString);
}

function inExceptionList(key) {
  return exceptions[key];
}

var licensed = {};
var problems = [];

Object.keys(licenses).forEach((key) => {
  var item = licenses[key];
  licensed[item.licenses] = (licensed[item.licenses] || 0) + 1;
  if (!inWhitelist(item.licenses + '') && !inExceptionList(key)) {
    // There's a problem here
    item.key = key;
    problems.push(item);
  }
});

console.log('Acceptable Projects', pp(licensed), NL);

console.log('Acceptable Exceptions', pp(exceptions), NL);

if (problems.length > 0) {
  console.log('Problems with the licenses for these dependencies:', pp(problems), NL);
  process.exit(1);
} else {
  console.log('All licenses ok');
  process.exit(0);
}
