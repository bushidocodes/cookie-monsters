#!/bin/bash
# To trigger a seed in Heroku, set SHOULD_SEED to true
case "$SHOULD_SEED" in
  true)
    echo "Detected $SHOULD_SEED as true, so going to seed"
    npm run seed;;
 *) echo "$SHOULD_SEED was undefined or false, so not going to seed";;
esac

# To run in production, set NODE_ENV to production
# The difference is use of node in place of nodemon
case "$NODE_ENV" in
  production)
    echo "$NODE_ENV is prod, so building WebPack bundle.js"
    npm run build
    echo "$NODE_ENV is prod, so running num run start[prod]"
    npm run start[prod];;
 *)
    echo "$NODE_ENV is undefined or false, so running num run start[dev]"
    npm run start[dev];;
esac