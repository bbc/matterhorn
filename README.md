<h1 align="center">Project Matterhorn</h1>

<p align="center">
  <b><a href="#overview">Overview</a></b> |
  <b><a href="#running">Running</a></b> |
  <b><a href="#testing">Testing</a></b> |
  <b><a href="#releasing">Releasing</a></b> |
  <b><a href="#useful-links">Useful Links</a></b>
</p>

## Overview

Matterhorn is a device identification service for legacy TVs that attempt to launch iPlayer on the "www.bbc.co.uk/iplayer" domain. For the details of the current usage of Matterhorn, please see [iPlayer Web Edge](https://github.com/bbc/iplayer-web-edge)

This service was used as the identification service for all TV devices in the past but the newer devices on "www.live.bbctvapps.co.uk/*" domain use the [melanite](https://github.com/bbc/melanite) library directly via [Tap Launch Edge](https://github.com/bbc/tap-launch-edge). 

## Certs

To update Matterhorn's certs follow the [guide here](./docs/cert-guide.md).

## Architecture

![Matterhorn Architecture Diagram](https://goo.gl/vuV2ZF)

---

## Development

### Prerequisites
* Install [docker](https://docker.github.io/engine/installation/)

### Running

```bash
npm install
./devSetup.sh
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

## Updating the Pipeline Submodule

Changes to the pipeline project (private) which configures hosting for Matterhorn are linked via a submodule.

**NOTE**: you must ensure your local repo clone contains the submodule references - for instance, either explicitly ask for them when cloning:

```git clone --recurse-submodules git@github.com:bbc/matterhorn.git```

or configure Git to account for submodules by default:

```git config --global submodule.recurse true```

To update the reference to the submodule, run:

```
git submodule foreach git pull origin master
```

### Releasing

Currently the tests are run against each commit.
If you want to build to an environment you must first make a tag, before building to TEST and then LIVE in Jenkins. Before depolying to Live, test that the new build is working by hitting the test status endpoint. You can also check the status of the EC2 instances via the AWS console in the IPTV prod and IPTV Dev (198243407611 and 119990297419) for Live and Test respectivly.

### Links

A table of useful links for the project.

Type                       | Location
-------------------------- | --------
Status Endpoint (live)           | https://connected-tv-service-matterhorn.api.bbci.co.uk/status
Status Endpoint (test)           | https://connected-tv-service-matterhorn.test.api.bbci.co.uk/status
User Agent Endpoint        | https://connected-tv-service-matterhorn.api.bbci.co.uk/identify/ua/:ua/json
WhoAmI Endpoint            | https://connected-tv-service-matterhorn.api.bbci.co.uk/identify/whoami/:whoami/json
Build Job                  | https://ci.itv.tools.bbc.co.uk/job/launch/job/matterhorn/job/build/
Deploy Job                 | https://ci.itv.tools.bbc.co.uk/job/launch/job/matterhorn/job/deploy/
Cosmos Service             | https://cosmos.tools.bbc.co.uk/services/matterhorn
Melanite Library           | https://github.com/bbc/melanite
Device Identification Data | https://github.com/bbc/device-identification-data
TAL                        | https://github.com/bbc/tal


## License

Matterhorn is available to everyone under the terms of the Apache 2.0 open source licence. Take a look at
the LICENSE file in the code, and read our [faq](https://bbc.github.io/tal/faq.html#question_who_can_use_this)
and [documentation](https://bbc.github.io/tal/other/contributing.html) to learn how to contribute.

© BBC 2017

---

[▲ back to top](#readme)
