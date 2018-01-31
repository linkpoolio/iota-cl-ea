FROM node:9.4.0

ADD adaptor/ /opt/adaptor/

ADD entrypoint.sh /entrypoint.sh
RUN chmod 0700 /entrypoint.sh

EXPOSE 8081

ENTRYPOINT "/entrypoint.sh"
