import { createTodo, removeTodo, loadTodoInProgress, loadTodosSuccess, loadTodosFailure, markTodoAsCompleted } from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodoInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(alert(e));
  }
}

export const addTodoRequest = text => async dispatch => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body,
    });
    const todo = response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(alert(e));
  }
};

export const removeTodoRequest = id => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "delete",
    });
    const removeTodos = await response.json();
    dispatch(removeTodo(removeTodos));
  } catch (e) {
    dispatch(alert(e));
  }
};

export const markTodoAsCompletedRequest = id => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
      method: "post",
    });
    const updateTodo = await response.json();
    dispatch(markTodoAsCompleted(updateTodo));
  } catch (e) {
    dispatch(alert(e));
  }
}