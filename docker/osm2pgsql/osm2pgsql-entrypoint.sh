#!/bin/bash
set -e

if [ "$1" = 'osm2pgsql' ]; then

    exec gosu osm2pgsql "$@"
fi

exec "$@"

