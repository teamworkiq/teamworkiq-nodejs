#! /usr/bin/env node
const path = require('path');
const userModule = require('./app.js');
const params = process.argv.slice(2);
const functionName = params[0];

if (!process.argv[0]) {
  console.error('Function name not provided i.e. twiq ./index.js default');
  process.exit();
}

if (!userModule) {
  throw new Error(`Module ${userModule} does not exists`);
}

if (!userModule[functionName]) {
  throw new Error(`Function ${functionName} is not present or exported from module ${userModule}`);
}
let paramsReturned = params.slice(1);

userModule[functionName](...paramsReturned);