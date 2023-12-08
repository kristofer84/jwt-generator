openssl genrsa -out rsa_private_key.pem 2048
openssl rsa -in rsa_private_key.pem  -outform PEM -pubout -out rsa_public_key.pem

openssl req -x509 -key rsa_private_key.pem -subj /CN=localhost -days 1000 > rsa_certificate.pem
X5T=`openssl x509 -in rsa_certificate.pem -fingerprint -noout | sed 's/SHA1 Fingerprint=//g' | sed 's/://g' | xxd -r -ps | base64`
X5C=`cat rsa_certificate.pem | sed 's/-----.*//' | tr -d "\n" | tr -d '='`

base64url::encode () { base64 -w0 | tr '+/' '-_' | tr -d '='; }
MODULUS=`openssl rsa -pubin -in rsa_public_key.pem -noout -modulus | sed 's/Modulus=//'  | xxd -r -p | base64url::encode`
jq \
  -n \
  --arg n "$MODULUS" \
    --arg x5t "$X5T" \
    --arg x5c "$X5C" \
    '{$x5t, "kid": $x5t, "x5c": [$x5c], "use": "sig"} + {kty: "RSA", e: "AQAB", $n}' > rsa_jwk.json

#PUBKEY=`grep -v -- ----- rsa_public_key.pem | tr -d '\n'`
#openssl rsa -pubin -inform PEM -text -noout < public.key
# openssl rsa -pubin -in rsa_public_key.pem -noout -modulus

rm rsa_public_key.pem
rm rsa_certificate.pem