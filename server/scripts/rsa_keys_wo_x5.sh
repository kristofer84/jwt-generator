openssl genrsa -out rsa_private_key.pem 2048
openssl rsa -in rsa_private_key.pem  -outform PEM -pubout -out rsa_public_key.pem

base64url::encode () { base64 -w0 | tr '+/' '-_' | tr -d '='; }
MODULUS=`openssl rsa -pubin -in rsa_public_key.pem -noout -modulus | sed 's/Modulus=//'  | xxd -r -p | base64url::encode`
KID=`tr -dc A-Za-z0-9 </dev/urandom | head -c 13`

jq \
  -n \
  --arg n "$MODULUS" \
  --arg kid "$KID" \
    '{$kid, "use": "sig"} + {kty: "RSA", e: "AQAB", $n}' > rsa_jwk.json

#PUBKEY=`grep -v -- ----- rsa_public_key.pem | tr -d '\n'`
#openssl rsa -pubin -inform PEM -text -noout < public.key
# openssl rsa -pubin -in rsa_public_key.pem -noout -modulus

rm rsa_public_key.pem

mv rsa_private_key.pem ../src/keys
mv rsa_jwk.json ../src/keys