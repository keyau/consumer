#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail
 
# Based on mongo/docker-entrypoint.sh
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303
if [ -n "$MONGO_INITDB_USERNAME" ] && [ -n "$MONGO_INITDB_PASSWORD" ]; then
"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
  use $MONGO_INITDB_DATABASE
  db.init.insert({"name":"test"})
  db.createUser({
      user: $(_js_escape "$MONGO_INITDB_USERNAME"),
      pwd: $(_js_escape "$MONGO_INITDB_PASSWORD"),
      roles: [ { role: 'readWrite', db: $(_js_escape "$MONGO_INITDB_DATABASE") } ]
  })
EOJS
else
  echo "Error when create user for new database"
fi
