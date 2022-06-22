import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Todo } from '../type/Todo';
import Header from './index';

const firstState: Todo[] = [
  { id: 1001, name: '環境構築', done: true },
  { id: 1002, name: 'Markdown記法を学ぶ', done: true },
  { id: 1003, name: 'Reactの画面を追加する ', done: false },
  { id: 1004, name: 'Reactでの単体テストの方法を調査する', done: false },
];

test('header test 入力欄（最初の状態）の確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <Header todolist={todolist} setTodolist={setTodolist} />;
      };       
  const { getByPlaceholderText } = render(<Wrapper />);  

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;

  // 確認: 入力欄に何も入っていない
  expect(inputNode.value).toBe('');
});

test('header test 入力欄に"タスク１"を入力', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <Header todolist={todolist} setTodolist={setTodolist} />;
      };       
  const { getByPlaceholderText } = render(<Wrapper />);  

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;

  // 操作：入力欄に"タスク１"を入力  
  userEvent.type(inputNode, 'タスク１');

  // 確認: 入力欄に"タスク１"が入っている
  expect(inputNode).toHaveValue('タスク１');
});

test('header test keyCode: 13を押した後の確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <Header todolist={todolist} setTodolist={setTodolist} />;
      }; 
      
  const { getByPlaceholderText } = render(<Wrapper />);  

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;
  
  // 操作：入力欄に"タスク１"を入力
  userEvent.type(inputNode, 'タスク１');
  
  // 操作：「Enter」を押下
  fireEvent.keyDown(inputNode, {
    keyCode: 13,
    charCode: 13,
  });

  // 確認: 入力欄に何も入っていない
  expect(inputNode.value).toBe('');
});

test('header test keyCode: 0を押した後の確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <Header todolist={todolist} setTodolist={setTodolist} />;
      }; 
      
  const { getByPlaceholderText } = render(<Wrapper />);  

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;
  
  // 操作：入力欄に"タスク１"を入力
  userEvent.type(inputNode, 'タスク１');
  
  // 操作：「BackSpace」を押下
  fireEvent.keyDown(inputNode, {
    keyCode: 0,
    charCode: 0,
  });

  // 確認: 入力欄に"タスク"が表示
  expect(inputNode.value).toBe('タスク１');
});

test('header test keyCode: 300を押した後の確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <Header todolist={todolist} setTodolist={setTodolist} />;
      }; 
      
  const { getByPlaceholderText } = render(<Wrapper />);  

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;
  
  // 操作：入力欄に"タスク１"を入力
  userEvent.type(inputNode, 'タスク１');
  
  // 操作：「BackSpace」を押下
  fireEvent.keyDown(inputNode, {
    keyCode: 300,
    charCode: 300,
  });

  // 確認: 入力欄に"タスク"が表示
  expect(inputNode.value).toBe('タスク１');
});

test('header test NULLの場合', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <Header todolist={todolist} setTodolist={setTodolist} />;
      }; 
      
  const { getByPlaceholderText } = render(<Wrapper />);  

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;
  
  // 操作：「Enter」を押下
  fireEvent.keyDown(inputNode, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13,
  });

  // 確認: 入力欄に何も入っていない
  expect(inputNode.value).toBe('');
});