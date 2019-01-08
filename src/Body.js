import './Body.css';
import Footer from './Footer';
import React from 'react';
import TodoCollection from './TodoCollection';
import TodoList from './TodoList';


interface Props {
  clearCompletedItems: () => void;
  collection: TodoCollection;
  toggleAllItemsCompleted: (toggle: boolean) => void;
}

export default class Body extends React.Component<Props> {
  toggleAllItemsCompleted = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.toggleAllItemsCompleted(event.target.checked);
  };

  render() {
    if (0 === this.props.collection.length) {
      return null;
    } else {
      return (
        <section id="main">
          <input
            id="toggle-all"
            type="checkbox"
            checked={0 === this.props.collection.remaining().length}
            onChange={this.toggleAllItemsCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList collection={this.props.collection} />
          <Footer
            clearCompletedItems={this.props.clearCompletedItems}
            itemsRemainingCount={this.props.collection.remaining().length}
            itemsDoneCount={this.props.collection.done().length}
          />
        </section>
      );
    }
  }
}
