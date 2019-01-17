#!/bin/bash
set -e

cosmos-release service matterhorn \
  /root/rpmbuild/RPMS/**/*.rpm \
  --os=centos7 \
  --release-version=v
