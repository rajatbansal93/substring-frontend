export function authHeader() {
  // return authorization header with jwt token
  let auth_cred = JSON.parse(localStorage.getItem('auth_cred'));

  if (auth_cred && auth_cred.token) {
      return { 
        'token-type': 'Bearer',
        'access-token': auth_cred.token,
        'client': auth_cred.client,
        'expiry': auth_cred.expiry,
        'uid': auth_cred.uid
      };
  } else {
      return {};
  }
}
