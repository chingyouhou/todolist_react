import React, { useState } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from '../type/Todo';
import List from './index';

const firstState: Todo[] = [
  { id: 1001, name: '環境構築', done: true },
  { id: 1002, name: 'Markdown記法を学ぶ', done: true },
  { id: 1003, name: 'Reactの画面を追加する ', done: false },
  { id: 1004, name: 'Reactでの単体テストの方法を調査する', done: false },
];

test('list test　最初の状態の確認', () => {
  const Wrapper = () => {
    const [todolist,setTodolist] = useState<Todo[]>(firstState);
        
    return <List todolist={todolist} setTodolist={setTodolist} />;
    };         
  const { getByLabelText,queryByText } = render(<Wrapper />);

  // 確認: "環境構築"が含まれていること
  expect(queryByText(/環境構築/)).toBeInTheDocument();
  // 確認: "Markdown記法を学ぶ"が含まれていること
  expect(queryByText(/Markdown記法を学ぶ/)).toBeInTheDocument();
  // 確認: "Reactの画面を追加する"が含まれていること
  expect(queryByText(/Reactの画面を追加する/)).toBeInTheDocument();
  // 確認: "Reactでの単体テストの方法を調査する"が含まれていること
  expect(queryByText(/Reactでの単体テストの方法を調査する/)).toBeInTheDocument();
  // 確認: "環境構築"がチェックされること
  expect(getByLabelText('環境構築')).toBeChecked();
  // 確認: "Markdown記法を学ぶ"がチェックされること
  expect(getByLabelText('Markdown記法を学ぶ')).toBeChecked();
  // 確認: "Reactの画面を追加する"がチェックされないこと
  expect(getByLabelText('Reactの画面を追加する')).not.toBeChecked();
  // 確認: "Reactでの単体テストの方法を調査する"がチェックされないこと
  expect(getByLabelText('Reactでの単体テストの方法を調査する')).not.toBeChecked();  
});

test('list test　選択（個別）_チェックを入れるの確認', () => {
  const Wrapper = () => {
    const [todolist,setTodolist] = useState<Todo[]>(firstState);
        
    return <List todolist={todolist} setTodolist={setTodolist} />;
    };         
  const { getByLabelText} = render(<Wrapper />);

  // 前提確認: "環境構築"がチェックされること
  expect(getByLabelText('環境構築')).toBeChecked();
  // 前提確認: "Markdown記法を学ぶ"がチェックされること
  expect(getByLabelText('Markdown記法を学ぶ')).toBeChecked();
  // 前提確認: "Reactの画面を追加する"がチェックされないこと
  expect(getByLabelText('Reactの画面を追加する')).not.toBeChecked();
  // 前提確認: "Reactでの単体テストの方法を調査する"がチェックされないこと
  expect(getByLabelText('Reactでの単体テストの方法を調査する')).not.toBeChecked();

  // 操作："Reactの画面を追加する"のチェックを入れる
  const checkbox1 = screen.getByRole('checkbox', { name: 'Reactの画面を追加する' });
  fireEvent.click(checkbox1);
  // 操作："Reactでの単体テストの方法を調査する"のチェックを入れる
  const checkbox2 = screen.getByRole('checkbox', { name: 'Reactでの単体テストの方法を調査する' });
  fireEvent.click(checkbox2);
  
  // 確認: "Reactの画面を追加する"がチェックされること
  expect(getByLabelText('Reactの画面を追加する')).toBeChecked();
  // 確認: "Reactでの単体テストの方法を調査する"がチェックされること
  expect(getByLabelText('Reactでの単体テストの方法を調査する')).toBeChecked(); 
});

test('list test　選択（個別）_チェックを外すの確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <List todolist={todolist} setTodolist={setTodolist} />;
      };       
  const { getByLabelText} = render(<Wrapper />);

  // 前提確認: "環境構築"がチェックされること
  expect(getByLabelText('環境構築')).toBeChecked();
  // 前提確認: "Markdown記法を学ぶ"がチェックされること
  expect(getByLabelText('Markdown記法を学ぶ')).toBeChecked();
  // 前提確認: "Reactの画面を追加する"がチェックされないこと
  expect(getByLabelText('Reactの画面を追加する')).not.toBeChecked();
  // 前提確認: "Reactでの単体テストの方法を調査する"がチェックされないこと
  expect(getByLabelText('Reactでの単体テストの方法を調査する')).not.toBeChecked();

  // 操作："環境構築"のチェックを外す
  const checkbox1 = screen.getByRole('checkbox', { name: '環境構築' });
  fireEvent.click(checkbox1);
  // 操作："Markdown記法を学ぶ"のチェックを外す
  const checkbox2 = screen.getByRole('checkbox', { name: 'Markdown記法を学ぶ' });
  fireEvent.click(checkbox2);

  // 確認: "環境構築"のチェックが外されること
  expect(getByLabelText('環境構築')).not.toBeChecked();
  // 確認: "Markdown記法を学ぶ"のチェックが外されること
  expect(getByLabelText('Markdown記法を学ぶ')).not.toBeChecked();
});

test('list test　タスク削除(1つ)の確認', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <List todolist={todolist} setTodolist={setTodolist} />;
      };       
  const { queryByText,getByLabelText} = render(<Wrapper />);

  // 前提確認: "環境構築"がチェックされること
  expect(getByLabelText('環境構築')).toBeChecked();
  // 前提確認: "Markdown記法を学ぶ"がチェックされること
  expect(getByLabelText('Markdown記法を学ぶ')).toBeChecked();
  // 前提確認: "Reactの画面を追加する"がチェックされないこと
  expect(getByLabelText('Reactの画面を追加する')).not.toBeChecked();
  // 前提確認: "Reactでの単体テストの方法を調査する"がチェックされないこと
  expect(getByLabelText('Reactでの単体テストの方法を調査する')).not.toBeChecked();

  // 操作："環境構築"を削除
  userEvent.clear(getByLabelText('環境構築'));
  expect(getByLabelText('環境構築')).toBeInTheDocument();

  // ボタンを押す
  const deleteButton = screen.getByRole('button', { name: '削除' });
  window.confirm = jest.fn(() => true);
  fireEvent.click(deleteButton);
  expect(deleteButton.textContent).toBe('削除');

  // 確認: "環境構築"が含まれていること
  expect(queryByText(/環境構築/)).toBeNull();
});

test('list test　タスク削除(1つ)の確認_window.confirm(false)の場合', () => {
  const Wrapper = () => {
      const [todolist,setTodolist] = useState<Todo[]>(firstState);
      
      return <List todolist={todolist} setTodolist={setTodolist} />;
      };       
  const { queryByText,getByLabelText} = render(<Wrapper />);

  // 前提確認: "環境構築"がチェックされること
  expect(getByLabelText('環境構築')).toBeChecked();
  // 前提確認: "Markdown記法を学ぶ"がチェックされること
  expect(getByLabelText('Markdown記法を学ぶ')).toBeChecked();
  // 前提確認: "Reactの画面を追加する"がチェックされないこと
  expect(getByLabelText('Reactの画面を追加する')).not.toBeChecked();
  // 前提確認: "Reactでの単体テストの方法を調査する"がチェックされないこと
  expect(getByLabelText('Reactでの単体テストの方法を調査する')).not.toBeChecked();

  // 操作："環境構築"を削除
  userEvent.clear(getByLabelText('環境構築'));
  expect(getByLabelText('環境構築')).toBeInTheDocument();

  // ボタンを押す
  const deleteButton = screen.getByRole('button', { name: '削除' });
  window.confirm = jest.fn(() => false);
  fireEvent.click(deleteButton);
  expect(deleteButton.textContent).toBe('削除');

  // 確認: "環境構築"が含まれていること
  expect(queryByText(/環境構築/)).toBeInTheDocument();
});

test('list test マウスflagの確認', () => {
  const Wrapper = () => {
    const [todolist,setTodolist] = useState<Todo[]>(firstState);
        
    return <List todolist={todolist} setTodolist={setTodolist} />;
    };         
  const { getByLabelText,getByRole,queryByText } = render(<Wrapper />);

  // 事前確認: "環境構築"が含まれていること
  expect(queryByText(/環境構築/)).toBeInTheDocument();

  // 操作：マウスを"環境構築"に離れる
  fireEvent.mouseLeave(getByLabelText('環境構築'));
  // 操作：マウスを"環境構築"に移動する
  fireEvent.mouseEnter(getByLabelText('環境構築'));
  // 確認: ボタン「削除」が表示する
  const button1 = getByRole('button', { name: '削除' });
  expect(button1.textContent).toBe('削除');
});