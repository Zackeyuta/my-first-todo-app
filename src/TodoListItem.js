import './TodoListItem.css';
import React from 'react';
import TodoModel from './TodoModel';


interface Props {
  editing: boolean;
  model: TodoModel;
  onStartEditing: (modelId: number | string) => void;
  onStopEditing: (modelId: number | string) => void;
}

export default class TodoListItem extends React.Component<Props> {
  _editInput: ?HTMLInputElement;

  componentDidUpdate(prevProps: Props) {
    if (this._editInput != null && this.props.editing && !prevProps.editing) {
      this._editInput.focus();
    }
  }

  destroy = () => {
    this.props.model.destroy();
  };

  handleEditKeyPress = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (13 === event.keyCode) {
      this.stopEditing();
    }
  };

  setTitle = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.model.set('title', event.target.value);
  };

  startEditing = () => {
    this.props.onStartEditing(this.props.model.id);
  };

  stopEditing = () => {
    this.props.onStopEditing(this.props.model.id);
  };

  toggleDone = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.model.set('done', event.target.checked);
  };

  render() {
    var inputStyles = {};
    var viewStyles = {};

    if (this.props.editing) {
      viewStyles.display = 'none';

    } else {
      inputStyles.display = 'none';
    }

    return (
      <li className={this.props.model.get('done') ? 'done' : ''}>
        <div className="view" onDoubleClick={this.startEditing} style={viewStyles}>
          <input
            checked={this.props.model.get('done')}
            className="toggle"
            onChange={this.toggleDone}
            type="checkbox"
          />
          <label>{this.props.model.get('title')}</label>
          <a className="destroy" onClick={this.destroy} title="Destroy">
            Destroy
          </a>
        </div>
        <input
          className="edit"
          onBlur={this.stopEditing}
          onChange={this.setTitle}
          onKeyPress={this.handleEditKeyPress}
          ref={ref => {
            this._editInput = ref;
          }}
          style={inputStyles}
          type="text"
          value={this.props.model.get('title')}
        />
      </li>
    );
  }
}
