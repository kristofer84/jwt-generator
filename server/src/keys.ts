import fs from "fs";

function getEcKey(): { kty: "EC"; kid: string; crv: string; x: string; y: string; x5c: []; x5t: string } {
  const keyPath = "./src/keys/ec_jwk.json";
  return JSON.parse(fs.readFileSync(keyPath, "utf8"));
}

function getRsaKey(): { kty: "RSA"; kid: string; n: string; e: "AQAB"; x5c: []; x5t: string } {
  const keyPath = "./src/keys/rsa_jwk.json";
  return JSON.parse(fs.readFileSync(keyPath, "utf8"));

  // const hexString =
  //   "B2FC048A6994E79622D0E038C0FA3D561E49AC50661E167455384A2C391FB5CA03149F9F7DD570B428421A40F3AF96A15AF9383E72A86E4A49F6F7C053944BC3DB2CE0327E4F03073B65E1E67190AD31BF4AC85E056A1485721AEAA11F2E64B4C25F80ECCDB06DE1AE2AFD17EC822B423FE2C132ECFBC3CD1321668BE759104C3F34A553507084BBB9F74A74C50DFEDF4B56BA1F5460E9DB4F023BDC7CD12EA7521593B184540FF218139141028FCEE12B8EC051C4C1DB60136852878B377F588BDD48FEEC2719F7DFD0B54A222E36EC460E2AA9CC6BD9ADC476944BC0305E664770A315EF56A09B78354E61776A84337D349034AB5A5A71A7207DA0DA53AC87";
  // var modulus = Buffer.from(hexString, "hex").toString("base64url");

  // key.kid = "rsa-key-2023-12-08";
  // key.n = modulus;
  // key.x5c = [];
}

export const ec_key = getEcKey();
export const rsa_key = getRsaKey();

// const keys = [ec_key, rsa_key];
const keys = [ec_key, rsa_key];

export const keydata = {
  keys,
};
