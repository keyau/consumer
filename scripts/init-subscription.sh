#!/bin/sh

curl -i -X PUT -d $'{"startFrom": 0,"resolveLinktos": true}' http://localhost:2113/subscriptions/%24ce-accounts/account -u admin:changeit -H "Content-Type: application/json"