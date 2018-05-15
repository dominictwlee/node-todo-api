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
