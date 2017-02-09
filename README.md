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
npm install
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

## License

Matterhorn is available to everyone under the terms of the Apache 2.0 open source licence. Take a look at
the LICENSE file in the code, and read our [faq](https://bbc.github.io/tal/faq.html#question_who_can_use_this)
and [documentation](https://bbc.github.io/tal/other/contributing.html) to learn how to contribute.

© BBC 2017

---

[▲ back to top](#readme)
