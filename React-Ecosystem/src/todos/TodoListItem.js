import React from 'react'
import styled from 'styled-components';

const TodoListItemContainer = styled.div`
  background:#fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position:relative;
  box-shadow: 0 4px 8px grey;
`;

const ButtonContainer = styled.div`
  position:absolute;
  right:12px;
  bottom: 12px;
`;

const CompletedButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display:inline-block;
  background-color: #22ee22;
`;

const RemoveButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display:inline-block;
  background-color: #ee2222;
  margin-left: 8px;
`;

function TodoListItem({todo, onRemovePressed, onCompletedPressed}) {
  //console.log(todo.text);
  return (
    <TodoListItemContainer>
      <h3>{todo.text}</h3>
      <p>
        Created at: &nbsp;
        {(new Date(todo.createdAt)).toLocaleDateString()}
      </p>
      <ButtonContainer>
        {todo.isCompleted ?
          null : <CompletedButton 
                  onClick={()=> onCompletedPressed(todo.id)}>
                  Mark As Completed</CompletedButton>}
        <RemoveButton
          onClick={() => onRemovePressed(todo.id)}
        >Delete</RemoveButton>
      </ButtonContainer>
    </TodoListItemContainer>
  )
}

export default TodoListItem