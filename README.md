<h1 align="center">Project Matterhorn</h1>

<p align="center">
<b><a href="#overview">Overview</a></b>
|
<b><a href="#running">Running</a></b>
|
<b><a href="#testing">Testing</a></b>
|
<b><a href="#releasing">Releasing</a></b>
|
<b><a href="#links">Useful Links</a></b>
</p>

![Matterhorn Sunset Photo](https://camo.githubusercontent.com/4ba74aa26b2968585c8516052e3f9f66623ee5c0/68747470733a2f2f616e746f696e656c616272616e6368652e66696c65732e776f726470726573732e636f6d2f323031322f30392f6d6174746572686f726e2d322e6a7067)

## Overview

Matterhorn is a device identification service for the TV Application Platform (TAP).

## Architecture

![Matterhorn Architecture Diagram](https://goo.gl/vuV2ZF)

---

## Development

### Prerequisites
* Install [docker](https://docker.github.io/engine/installation/)

### Running

```bash
./scripts/sandbox/devSetup.sh
```

### Testing

```bash
docker-compose exec matterhorn npm test
```

We test our code using [**Jasmine**](http://jasmine.github.io)
& [**ESlint**](http://eslint.org). Running
`npm test` will run `eslint` on your source code, followed by the
`jasmine` tests.

The Jasmine tests are separated into _two_ categories;

+ Spec tests - _standard Jasmine unit tests_
+ Integration tests - _tests against upstreams and full app integration_

#### Running Separate Tests ####

You can run the different test categories separately by running any of
the following commands.

```bash
docker-compose exec matterhorn npm run test:spec
docker-compose exec matterhorn npm run test:integration
```

### Releasing

Currently the tests are run against each commit.
If you want to build to an environment you must first make a tag, before building to TEST and then LIVE in Jenkins.

---

[▲ back to top](#readme)
