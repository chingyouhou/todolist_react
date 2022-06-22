import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from '../type/Todo';
import Footer from './index';

const firstState: Todo[] = [
  { id: 1001, name: '環境構築', done: true },
  { id: 1002, name: 'Markdown記法を学ぶ', done: true },
  { id: 1003, name: 'Reactの画面を追加する ', done: false },
  { id: 1004, name: 'Reactでの単体テストの方法を調査する', done: false },
];

test('footer test 全選択_チェックを入れるの確認', () => {
    const Wrapper = () => {
        const [todolist,setTodolist] = useState<Todo[]>(firstState);
        
        return <Footer todolist={todolist} setTodolist={setTodolist} />;
        }; 
        
    const { getByText } = render(<Wrapper />);  
  
  // 前提確認:  Footer部分の「完了」の数字が2になっていること
  expect(getByText(/完了 2/)).toBeInTheDocument();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();

  // 操作："完了 2 / 全部 4"のチェックを入れる
  const checkbox1 = screen.getByRole('checkbox', { name: '完了 2 / 全部 4' });
  fireEvent.click(checkbox1);

  // 確認:  Footer部分の「完了」の数字が4になっていること
  expect(getByText(/完了 4/)).toBeInTheDocument();
  // 確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();
});

test('footer test 全選択_チェックを外すの確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <Footer todolist={todolist} setTodolist={setTodolist} />;
      }; 
      
  const { getByText } = render(<Wrapper />);  

  // 前提確認:  Footer部分の「完了」の数字が2になっていること
  expect(getByText(/完了 2/)).toBeInTheDocument();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();

  // 操作："完了 2 / 全部 4"のチェックを入れた後外す
  const checkbox1 = screen.getByRole('checkbox', { name: '完了 2 / 全部 4' });
  fireEvent.click(checkbox1);
  fireEvent.click(checkbox1);

  // 確認:  Footer部分の「完了」の数字が0になっていること
  expect(getByText(/完了 0/)).toBeInTheDocument();
  // 確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();
});

test('footer test タスク全削除(チェックなし)の確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
        
      return <Footer todolist={todolist} setTodolist={setTodolist} />;
      }; 
        
  const { getByText } = render(<Wrapper />);  
  
  // 前提確認:  Footer部分の「完了」の数字が2になっていること
  expect(getByText(/完了 2/)).toBeInTheDocument();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();

  // 操作："完了 2 / 全部 4"のチェックを入れた後外す
  const checkbox1 = screen.getByRole('checkbox', { name: '完了 2 / 全部 4' });
  fireEvent.click(checkbox1);
  fireEvent.click(checkbox1);

  // ボタンを押す
  const deleteButton = screen.getByRole('button', { name: 'チェックしたタスクを削除' });
  window.confirm = jest.fn(() => true);
  fireEvent.click(deleteButton);
  expect(deleteButton.textContent).toBe('チェックしたタスクを削除');

  // 確認:  Footer部分の「完了」の数字が0になっていること
  expect(getByText(/完了 0/)).toBeInTheDocument();
  // 確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();
  });

test('footer test タスク全削除(複数チェック)の確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
        
      return <Footer todolist={todolist} setTodolist={setTodolist} />;
      }; 
        
  const { getByText } = render(<Wrapper />);  
  
  // 前提確認:  Footer部分の「完了」の数字が2になっていること
  expect(getByText(/完了 2/)).toBeInTheDocument();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();

  // ボタンを押す
  const deleteButton = screen.getByRole('button', { name: 'チェックしたタスクを削除' });
  window.confirm = jest.fn(() => true);
  fireEvent.click(deleteButton);
  expect(deleteButton.textContent).toBe('チェックしたタスクを削除');

  // 確認:  Footer部分の「完了」の数字が0になっていること
  expect(getByText(/完了 0/)).toBeInTheDocument();
  // 確認:  Footer部分の「全部」の数字が2になっていること
  expect(getByText(/全部 2/)).toBeInTheDocument();
  });

test('footer test タスク全削除(全部チェック)の確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
          
      return <Footer todolist={todolist} setTodolist={setTodolist} />;
      }; 
          
  const { getByText } = render(<Wrapper />);  
    
  // 前提確認:  Footer部分の「完了」の数字が2になっていること
  expect(getByText(/完了 2/)).toBeInTheDocument();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();
  
  // 操作："完了 2 / 全部 4"のチェックを入れる
  const checkbox1 = screen.getByRole('checkbox', { name: '完了 2 / 全部 4' });
  fireEvent.click(checkbox1);

  // ボタンを押す
  const deleteButton = screen.getByRole('button', { name: 'チェックしたタスクを削除' });
  window.confirm = jest.fn(() => true);
  fireEvent.click(deleteButton);
  expect(deleteButton.textContent).toBe('チェックしたタスクを削除');
  
  // 確認:  Footer部分の「完了」の数字が0になっていること
  expect(getByText(/完了 0/)).toBeInTheDocument();
  // 確認:  Footer部分の「全部」の数字が0になっていること
  expect(getByText(/全部 0/)).toBeInTheDocument();
}); 

test('footer test タスク全削除(全部チェック)の確認_window.confirm(false)の場合', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
          
      return <Footer todolist={todolist} setTodolist={setTodolist} />;
      }; 
          
  const { getByText } = render(<Wrapper />);  
    
  // 前提確認:  Footer部分の「完了」の数字が2になっていること
  expect(getByText(/完了 2/)).toBeInTheDocument();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();
  
  // 操作："完了 2 / 全部 4"のチェックを入れる
  const checkbox1 = screen.getByRole('checkbox', { name: '完了 2 / 全部 4' });
  fireEvent.click(checkbox1);

  // ボタンを押す
  const deleteButton = screen.getByRole('button', { name: 'チェックしたタスクを削除' });
  window.confirm = jest.fn(() => false);
  fireEvent.click(deleteButton);
  expect(deleteButton.textContent).toBe('チェックしたタスクを削除');
  
  // 確認:  Footer部分の「完了」の数字が4になっていること
  expect(getByText(/完了 4/)).toBeInTheDocument();
  // 確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();
});