FROM bbc_cosmos/sandbox-el7-authed

RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash - \
    && yum install -y nodejs

COPY . /usr/lib/matterhorn

