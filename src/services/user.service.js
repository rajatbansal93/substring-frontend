import { authHeader } from '../helpers';

export const userService = {
  login,
  logout,
  register,
  getAllCalculations,
  deleteCal
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };


  return fetch(`http://localhost:5000/auth/sign_in`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
    body: JSON.stringify({ email: JSON.parse(localStorage.getItem('user')).data.email })
  };
  return fetch(`http://localhost:5000/auth/sign_out`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };
  return fetch(`http://localhost:5000/auth`, requestOptions).then(handleResponse);
}


function getAllCalculations(user) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`http://localhost:5000/users/${user.data.id}/substring_calculations`, requestOptions).then(handleResponse);
}


function deleteCal(user, calculationId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };
  const url = `http://localhost:5000/users/${user.data.id}/substring_calculations/${calculationId}`;
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) { 
  if (response.headers.get('access-token')) {
    localStorage.setItem('auth_cred', JSON.stringify({
      token: response.headers.get('access-token'),
      client: response.headers.get('client'),
      expiry: response.headers.get('expiry'),
      uid: response.headers.get('uid')
    }));
  }

  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
