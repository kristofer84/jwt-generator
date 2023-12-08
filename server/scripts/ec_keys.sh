# npm install -g eckles
openssl ecparam -genkey -name prime256v1 -out ec_private_key.pem
openssl ec -in ec_private_key.pem -pubout -out ec_public_key.pem
eckles ec_public_key.pem > ec_jwk.json


openssl req -x509 -key ec_private_key.pem -subj /CN=localhost -days 1000 > ec_certificate.pem
X5T=`openssl x509 -in ec_certificate.pem -fingerprint -noout | sed 's/SHA1 Fingerprint=//g' | sed 's/://g' | xxd -r -ps | base64`
X5C=`cat ec_certificate.pem | sed 's/-----.*//' | tr -d "\n" | tr -d '='`

echo $(jq \
    --arg x5t "$X5T" \
    --arg x5c "$X5C" \
'. + {$x5t, "kid": $x5t, "x5c": [$x5c], "use": "sig"}' ec_jwk.json) > ec_jwk.json

rm ec_public_key.pem
rm ec_certificate.pem