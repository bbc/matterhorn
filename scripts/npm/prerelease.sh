#!/bin/bash
set -e

VERSION=$(node -e "console.log(require('./package.json').version)")
speculate --release $VERSION_`git rev-parse --short HEAD`
mkdir -p /root/rpmbuild/SOURCES/
cp SOURCES/matterhorn.tar.gz /root/rpmbuild/SOURCES/matterhorn.tar.gz
rpmbuild -ba SPECS/matterhorn.spec
