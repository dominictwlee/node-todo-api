export function getTodos(token) {
  return fetch('/todos', {
    method: 'GET',
    headers: new Headers({
      'x-auth': token
    })
  }).then(response => response.json());
}

export function authenticateUser(data) {
  return fetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(response => response.headers.get('x-auth'));
}

export function logoutUser(token) {
  return fetch('/users/me/token', {
    method: 'DELETE',
    headers: new Headers({
      'x-auth': token
    })
  })
    .then(() => {
      console.log(Response.status);
      localStorage.removeItem('todoToken');
    })
    .catch(err => console.log(err));
}
