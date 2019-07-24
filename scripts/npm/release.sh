#!/bin/bash
set -e

cosmos-release service matterhorn-wargame \
  /root/rpmbuild/RPMS/**/*.rpm \
  --os=centos7 \
  --release-version=v
