#!/bin/sh

set -eu

mkdir -p \
  /workspace/backend/node_modules \
  /workspace/frontend/node_modules \
  /home/node/.codex

chown node:node \
  /workspace/backend/node_modules \
  /workspace/frontend/node_modules \
  /home/node/.codex

exec gosu node "$@"
