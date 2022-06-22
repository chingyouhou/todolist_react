import React, { useState } from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import { Todo } from './components/type/Todo';
import './App.css';

const firstState: Todo[] = [
  { id: 1001, name: '環境構築', done: true },
  { id: 1002, name: 'Markdown記法を学ぶ', done: true },
  { id: 1003, name: 'Reactの画面を追加する ', done: false },
  { id: 1004, name: 'Reactでの単体テストの方法を調査する', done: false },
];

const App: React.VFC = () => {
  const [todolist, setTodolist] = useState(firstState);

  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <h1 className="todo-text">TodoList</h1>
        <Header todolist={todolist} setTodolist={setTodolist} />
        <List todolist={todolist} setTodolist={setTodolist} />
        <Footer todolist={todolist} setTodolist={setTodolist} />
      </div>
    </div>
  )
}

export default App;
