#!/bin/bash
set -e

speculate --release `git rev-parse --short HEAD`
mkdir -p /root/rpmbuild/SOURCES/
cp SOURCES/matterhorn.tar.gz /root/rpmbuild/SOURCES/matterhorn.tar.gz
rpmbuild -ba SPECS/matterhorn.spec
