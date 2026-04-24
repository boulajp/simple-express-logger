# simple-express-logger [![CI](https://github.com/boulajp/simple-express-logger/actions/workflows/ci.yml/badge.svg)](https://github.com/boulajp/simple-express-logger/actions/workflows/ci.yml) [![npm version](https://img.shields.io/npm/v/simple-express-logger)](https://www.npmjs.com/package/simple-express-logger) [![npm downloads](https://img.shields.io/npm/dw/simple-express-logger)](https://www.npmjs.com/package/simple-express-logger)

Simple Express logging middleware. Logs every incoming request to the console:

```
REQUEST: {GET} /api/foo
```

> **Note:** This logs all requests entering the server, not just matched Express routes.

## Installation

```sh
npm install simple-express-logger
```

## Usage

```javascript
const express = require('express');
const logger = require('simple-express-logger');

const app = express();
app.use(logger());
```

## API

**`logger([options])`**

| Option | Type | Description |
|--------|------|-------------|
| `customOutput` | `Function` | Replaces `console.log`. Useful for piping output to an external logger. |
| `extraFields` | `String[]` | Names of additional fields on `req` to log. Example: `{ extraFields: ['headers'] }` logs `headers: {"foo":1,"bar":2}` |
