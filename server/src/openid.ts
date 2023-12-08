export const openid = {
  issuer: "http://localhost:7891/",
  authorization_endpoint: "http://localhost:7891/api/authorize",
  token_endpoint: "http://localhost:7891/api/token",
  userinfo_endpoint: "http://localhost:7891/api/userinfo",
  jwks_uri: "http://localhost:7891/keys",
  response_types_supported: ["code", "token", "id_token", "code token", "code id_token", "token id_token", "code token id_token", "none"],
  subject_types_supported: ["public"],
  id_token_signing_alg_values_supported: ["RS256", "ES256"],
  scopes_supported: ["openid"],
  request_uri_parameter_supported: false,
};
