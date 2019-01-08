import './TodoList.css';
import React from 'react';
import TodoCollection from './TodoCollection';
import TodoListItem from './TodoListItem';


interface Props {
  collection: TodoCollection;
}

interface State {
  editingModelId: ?(number | string);
}

export default class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editingModelId: undefined,
    };
  }
  setEditingModelId = (modelId: number | string) => {
    this.setState({ editingModelId: modelId });
  };

  unsetEditingModelId = (modelId: number | string) => {
    if (modelId === this.state.editingModelId) {
      this.setState({ editingModelId: undefined });
    }
  };

  render() {
    return (
      <ul id="todo-list">
        {this.props.collection.map(model => (
          <TodoListItem
            editing={this.state.editingModelId === model.id}
            key={model.id}
            model={model}
            onStartEditing={this.setEditingModelId}
            onStopEditing={this.unsetEditingModelId}
          />
        ))}
      </ul>
    );
  }
}
