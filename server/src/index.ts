require("dotenv").config();
import jwt from "jsonwebtoken";
import express from "express";
import http from "http";
import { openid } from "./openid";
import { ec_key, keydata, rsa_key } from "./keys";
import cors from "cors";

import fs from "fs";

const app = express();
app.use(express.json());

const isOriginAllowed = (origin: string | undefined) => {
  // Check if the origin is allowed
  if (!origin) return false;
  return ["https://jwt.io", "http://localhost:7891"].includes(origin);
};

// Use a custom function for dynamic origin checking
app.use(
  cors({
    // origin: isOriginAllowed,
  })
);

const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const ecPrivateKey = fs.readFileSync("./src/keys/ec_private_key.pem", "utf8");
const pemPrivateKey = fs.readFileSync("./src/keys/rsa_private_key.pem", "utf8");

app.get("/", (req, res): void => {
  res.json({ status: "ok" });
});

app.get("/.well-known/openid-configuration", function (req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(openid, null, 2));
});

app.get("/keys", function (req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(keydata, null, 2));
});

app.get("/tokenEc", async (req, res) => {
  // Create token

  const token = jwt.sign({ user_id: "Kristofer", email: "kristofer.nilsson@outlook.com" }, ecPrivateKey, {
    issuer: "http://localhost:7891",
    // expiresIn: "2h",
    // algorithm: "ES256",
    keyid: ec_key.kid,
    header: {
      alg: "ES256",
      //  x5t: ec_key.x5t
    },
  });

  res.json({ token });
});

app.get("/tokenRsa", async (req, res) => {
  // Create token

  const token = jwt.sign({ user_id: "Kristofer", email: "kristofer.nilsson@outlook.com" }, pemPrivateKey, {
    issuer: "http://localhost:7891",
    keyid: rsa_key.kid,
    header: {
      alg: "RS256",
      //  x5t: rsa_key.x5t
    },
  });

  res.json({ token });
});

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
