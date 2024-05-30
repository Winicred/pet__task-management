import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {TodoList} from "./TodoList.tsx";
import {Provider} from "react-redux";
import {store} from "@/stores/store.ts";
import {todoActions} from "@/stores/slices/todo.ts";


/**
 * Function to load todos from local storage during initialization.
 */
function getTodosFromLocalStorage() {
  const todos = localStorage.getItem('todos')
  return todos ? JSON.parse(todos) : []
}

// Hydrate the store with todos from local storage (if it exists).
const todos = getTodosFromLocalStorage()
if (todos) {
  store.dispatch(todoActions.hydrate(todos))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoList />
    </Provider>
  </React.StrictMode>,
)
