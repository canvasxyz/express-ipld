# express-ipld

Express middleware for dag-json and dag-cbor IPLD codecs.

Usage:

```ts
import express from "express";
import ipld from "express-ipld";

const app = express();

app.use(ipld());

app.post("/", (req, res) => {
  // if request has content-type application/json or application/cbor,
  // req.body will be parsed using dag-json / dag-cbor
  // ...
});
```
