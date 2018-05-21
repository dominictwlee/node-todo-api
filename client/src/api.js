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
      localStorage.removeItem('todoToken');
    })
    .catch(err => console.log(err));
}

export function completeTodo(token, stateId, data) {
  return fetch(`/todos/${stateId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-auth': token
    })
  })
    .then(response => response.json())
    .then(() => console.log('Todo Completed'))
    .catch(err => console.log(err));
}

export function deleteTodo(token, stateId) {
  return fetch(`/todos/${stateId}`, {
    method: 'DELETE',
    headers: new Headers({
      'x-auth': token
    })
  })
    .then(response => response.json())
    .then(() => console.log('Todo Deleted'));
}

export function addTodo(token, data) {
  return fetch('/todos', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-auth': token
    })
  })
    .then(response => response.json())
    .then(() => console.log('Todo Added'))
    .catch(err => console.log(err));
}
