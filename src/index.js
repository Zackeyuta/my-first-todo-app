import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoCollection from './TodoCollection';

ReactDOM.render(
  <App models={{ todos: new TodoCollection() }} />,
  document.getElementById('todoapp')
);
