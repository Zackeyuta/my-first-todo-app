import './Footer.css';
import React from 'react';


interface Props {
  clearCompletedItems: (event: SyntheticMouseEvent<HTMLAnchorElement>) => void;
  itemsDoneCount: number;
  itemsRemainingCount: number;
}

export default class Footer extends React.Component<Props> {
  render() {
    var clearCompletedButton;

    if (this.props.itemsDoneCount > 0) {
      clearCompletedButton = (
        <a id="clear-completed" onClick={this.props.clearCompletedItems}>
          Clear {this.props.itemsDoneCount} completed
          {1 === this.props.itemsDoneCount ? ' item' : ' items'}
        </a>
      );
    }

    return (
      <footer>
        {clearCompletedButton}
        <div className="todo-count">
          <b>{this.props.itemsRemainingCount}</b>
          {1 === this.props.itemsRemainingCount ? ' item' : ' items'} left
        </div>
      </footer>
    );
  }
}
