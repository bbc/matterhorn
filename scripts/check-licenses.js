const licenses = require('../licences.json');
const colors = require('colors/safe');
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

var licensedCount = 0;
var problemCount = 0;
var exceptionCount = 0;

Object.keys(licenses).forEach((key) => {
  var item = licenses[key];
  licensed[item.licenses] = (licensed[item.licenses] || 0) + 1;
  if (inWhitelist(item.licenses + '')) {
    licensedCount++;
  } else if (inExceptionList(key)) {
    exceptionCount++;
  } else {
    // There's a problem here
    item.key = key;
    problems.push(item);
    problemCount++;
  }
});

// Formatting and Output

function ppLicensed(title, items) {
  const rows = Object.keys(items).map((item) => {
    const value = items[item];
    return colors.green(`  ${item} (${value})`);
  }).sort();
  return [title].concat(rows).join(NL);
}

function ppExceptions(title, items) {
  const rows = Object.keys(items).map((item) => {
    const value = items[item];
    return colors.blue(`  ${item}${NL}    Reason: ${value.reason}`);
  }).sort();
  return [title].concat(rows).join(NL);
}

function ppProblems(title, items) {
  const rows = items.map((item) => {
    const value = items[item];
    return colors.red([
      `  ${item.key}`,
      `    License:     ${item.licences}`,
      `    Repository:  ${item.repository}`,
      `    Publisher:   ${item.publisher}`,
      `    Url:         ${item.url}`,
      ``
    ].join(NL));
  }).sort();
  return [title].concat(rows).join(NL);
}

console.log(ppLicensed('Acceptable Projects', licensed), NL);

console.log(ppExceptions('Acceptable Exceptions', exceptions), NL);

const summary = [
  colors.green(`Licensed (${licensedCount})`),
  colors.blue(`Exceptions (${exceptionCount})`),
  colors.red(`Problems (${problemCount})`)
].join(' ');

if (problems.length > 0) {
  console.log(ppProblems('Problems with the licenses for these dependencies:', problems), NL);
  console.log(colors.green(`Licenses not ok`), summary);
  process.exit(1);
} else {
  console.log(colors.green(`All licenses ok`), summary);
  process.exit(0);
}
