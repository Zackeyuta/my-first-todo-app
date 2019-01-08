import './App.css';
import _ from 'underscore';
import Body from './Body';
import React from 'react';
import TodoCollection from './TodoCollection';
import { connectBackboneToReact } from 'connect-backbone-to-react';

interface Props {
  collection: TodoCollection;
}

interface State {
  title: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentWillMount() {
    this.props.collection.fetch();
  }

  clearCompletedItems = () => {
    _.invoke(this.props.collection.done(), 'destroy');
  };

  handleTitleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  handleTitleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ('' === this.state.title) return;

    this.props.collection.create({ title: this.state.title });
    this.setState({ title: '' });
  };

  toggleAllItemsCompleted = completed => {
    this.props.collection.forEach(function(todo) {
      todo.save({ done: completed });
    });
  };

  render() {
    return (
      <div>
        <header>
          <h1>Todos</h1>
          <form onSubmit={this.handleTitleFormSubmit}>
            <input
              name="title"
              onChange={this.handleTitleChange}
              placeholder="totototototo dodododo!!!"
              type="text"
              value={this.state.title}
            />
          </form>
        </header>
        <Body
          clearCompletedItems={this.clearCompletedItems}
          collection={this.props.collection}
          toggleAllItemsCompleted={this.toggleAllItemsCompleted}
        />
      </div>
    );
  }
}


const mapModelsToProps = models => ({
  collection: models.todos,
});

export default connectBackboneToReact(mapModelsToProps)(App);
