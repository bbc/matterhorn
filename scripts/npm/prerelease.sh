#!/bin/bash
set -e

VERSION=$(node -e "console.log(require('./package.json').version)")
speculate --release $VERSION_`git rev-parse --short HEAD`
mkdir -p /root/rpmbuild/SOURCES/
cp SOURCES/matterhorn-wargame.tar.gz /root/rpmbuild/SOURCES/matterhorn-wargame.tar.gz
rpmbuild -ba SPECS/matterhorn-wargame.spec
