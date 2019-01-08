import Backbone from 'backbone';
import 'backbone.localstorage';
import TodoModel from './TodoModel';

export default class TodoCollection extends Backbone.Collection<TodoModel> {
  static model = TodoModel;

  localStorage = new Backbone.LocalStorage('todos-react');

  done() {
    return this.where({ done: true });
  }

  remaining() {
    return this.where({ done: false });
  }
}
