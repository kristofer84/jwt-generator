# npm install -g eckles
openssl ecparam -genkey -name prime256v1 -out ec_private_key.pem
openssl ec -in ec_private_key.pem -pubout -out ec_public_key.pem
eckles ec_public_key.pem > ec_jwk.json


KID=`tr -dc A-Za-z0-9 </dev/urandom | head -c 13`

echo $(jq \
    --arg kid "$KID" \
'. + {$kid, "use": "sig"}' ec_jwk.json) > ec_jwk.json

rm ec_public_key.pem
