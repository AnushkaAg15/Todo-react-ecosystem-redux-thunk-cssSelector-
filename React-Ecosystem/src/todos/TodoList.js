import React, { useEffect } from 'react'
import TodoListItem from "./TodoListItem";
import NewTodoForm from './NewTodoForm';
import { connect } from "react-redux";
import styled from "styled-components";
import { getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
//import { markTodoAsCompleted } from "./actions";
//import { isLoading } from './reducers';

const ListWrapper = styled.div`
  max-width: 700px;
  margin:auto;
`;

function TodoList({completedTodos, incompletedTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) {
  useEffect(()=>{
    startLoadingTodos();
  },[]);

  const loadingMessage = <div>Loading todo...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm/>
      <h3>Incomplete:</h3>
      {incompletedTodos.map(todo => <TodoListItem todo={todo} 
      onRemovePressed={onRemovePressed} 
      onCompletedPressed={onCompletedPressed}/>)}
      <h3>Completed:</h3>
      {completedTodos.map(todo=><TodoListItem todo={todo}
      onRemovePressed={onRemovePressed}
      onCompletedPressed={onCompletedPressed}/>)}
    </ListWrapper>
  )

  return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompletedTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
  startLoadingTodos: ()=> dispatch(loadTodos()),
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);