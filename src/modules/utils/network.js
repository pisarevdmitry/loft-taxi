export const baseUrl = 'http://localhost:5000';

export const request = ({ path, method = 'GET', body, token }) =>
  fetch(`${baseUrl}${path}`, {
    method,
    body,
    headers: Object.assign(
      {},
      { 'content-type': 'application/json' },
      token && { Authorization: `Bearer ${token}` }
    ),
    mode: 'cors'
  }).then(response => {
    if (response.status < 400) return response.json();
    else return Promise.reject(response);
  });
