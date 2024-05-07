import express from "express";
import * as cbor from "@ipld/dag-cbor";
import * as json from "@ipld/dag-json";

export type ParseOptions = { type?: string | string[] };

export default function ipld(options: ParseOptions = {}) {
  const rawParser = express.raw({
    type: options.type ?? ["application/json", "application/cbor"],
  });

  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const contentType = req.headers["content-type"];

    rawParser(req, res, (err) => {
      if (err) {
        return next(err);
      }

      if (req.body instanceof Uint8Array) {
        if (contentType === "application/json") {
          try {
            req.body = json.decode(req.body);
          } catch (err) {
            return res.status(400).send("Invalid dag-json request body");
          }
        } else if (contentType === "application/cbor") {
          try {
            req.body = cbor.decode(req.body);
          } catch (err) {
            return res.status(400).send("Invalid dag-cbor request body");
          }
        } else {
          return res.status(400).send("Invalid dag-cbor request body");
        }
      }

      next();
    });
  };
}
