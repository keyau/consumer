#!/bin/sh

curl -i -X PUT -d '{"startFrom": 0,"resolveLinktos": true}' http://eventstore:2113/subscriptions/%24ce-accounts/account -u admin:changeit -H "Content-Type: application/json"
curl -i -X PUT -d '{"startFrom": 0,"resolveLinktos": true}' http://eventstore:2113/subscriptions/%24ce-selections/selection -u admin:changeit -H "Content-Type: application/json"