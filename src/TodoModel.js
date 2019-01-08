import Backbone from 'backbone';

export default class TodoModel extends Backbone.Model {
  static defaults = {
    done: false,
    title: '',
  };
}
