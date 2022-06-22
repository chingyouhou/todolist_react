import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('入力の確認', () => {
  const { getByPlaceholderText, getAllByRole, queryByText, getByText } = render(
    <App />,
  );

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;

  // 前提確認: タスク１が含まれていないこと
  expect(queryByText(/タスク１/)).toBeNull();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();

  // 操作：入力欄に"タスク１"を入力
  userEvent.type(inputNode, 'タスク１');
  expect(inputNode).toHaveValue('タスク１');

  // 操作：「Enter」を押下
  fireEvent.keyDown(inputNode, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13,
  });

  // 確認①: リスト一覧の最上部に「タスク１」が追加される
  const todoList = getAllByRole('listitem');
  const todoTextLists = todoList.map((item) => item.textContent);
  expect(todoList.length).toBe(5);
  expect(todoTextLists[0]).toMatch(/タスク１/);

  // 確認②: Footer部分の「全部」の数字は5になる
  expect(getByText(/全部 5/)).toBeInTheDocument();
});

test('入力（NULLの場合）の確認', () => {
  const { getByLabelText,getByPlaceholderText, getAllByRole, queryByText, getByText } = render(
    <App />,
  );

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;

  // 前提確認: "環境構築"が含まれていること
  expect(queryByText(/環境構築/)).toBeInTheDocument();
  // 前提確認: "Markdown記法を学ぶ"が含まれていること
  expect(queryByText(/Markdown記法を学ぶ/)).toBeInTheDocument();
  // 前提確認: "Reactの画面を追加する"が含まれていること
  expect(queryByText(/Reactの画面を追加する/)).toBeInTheDocument();
  // 前提確認: "Reactでの単体テストの方法を調査する"が含まれていること
  expect(queryByText(/Reactでの単体テストの方法を調査する/)).toBeInTheDocument();
  // 前提確認: "環境構築"がチェックされること
  expect(getByLabelText('環境構築')).toBeChecked();
  // 前提確認: "Markdown記法を学ぶ"がチェックされること
  expect(getByLabelText('Markdown記法を学ぶ')).toBeChecked();
  // 前提確認: "Reactの画面を追加する"がチェックされないこと
  expect(getByLabelText('Reactの画面を追加する')).not.toBeChecked();
  // 前提確認: "Reactでの単体テストの方法を調査する"がチェックされないこと
  expect(getByLabelText('Reactでの単体テストの方法を調査する')).not.toBeChecked();
  // 前提確認:  Footer部分の「完了」の数字が2になっていること
  expect(getByText(/完了 2/)).toBeInTheDocument();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();

  // 操作：入力欄に何も入力しない
  userEvent.type(inputNode, '');
  expect(inputNode).toHaveValue('');

  // 操作：「Enter」を押下
  fireEvent.keyDown(inputNode, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13,
  });

  // 確認①: リスト一覧の最上部に「環境構築」のまま
  const todoList = getAllByRole('listitem');
  const todoTextLists = todoList.map((item) => item.textContent);
  expect(todoList.length).toBe(4);
  expect(todoTextLists[0]).toMatch(/環境構築/);

  // 確認②: Footer部分の「全部」の数字は4になる
  expect(getByText(/全部 4/)).toBeInTheDocument();
});

test('入力（スペースのみの場合）の確認', () => {
  const { getByLabelText,getByPlaceholderText, getAllByRole, queryByText, getByText } = render(
    <App />,
  );

  const inputNode = getByPlaceholderText(
    'タスクを入力後、「Enter」を押してください。',
  ) as HTMLInputElement;

  // 前提確認: "環境構築"が含まれていること
  expect(queryByText(/環境構築/)).toBeInTheDocument();
  // 前提確認: "Markdown記法を学ぶ"が含まれていること
  expect(queryByText(/Markdown記法を学ぶ/)).toBeInTheDocument();
  // 前提確認: "Reactの画面を追加する"が含まれていること
  expect(queryByText(/Reactの画面を追加する/)).toBeInTheDocument();
  // 前提確認: "Reactでの単体テストの方法を調査する"が含まれていること
  expect(queryByText(/Reactでの単体テストの方法を調査する/)).toBeInTheDocument();
  // 前提確認: "環境構築"がチェックされること
  expect(getByLabelText('環境構築')).toBeChecked();
  // 前提確認: "Markdown記法を学ぶ"がチェックされること
  expect(getByLabelText('Markdown記法を学ぶ')).toBeChecked();
  // 前提確認: "Reactの画面を追加する"がチェックされないこと
  expect(getByLabelText('Reactの画面を追加する')).not.toBeChecked();
  // 前提確認: "Reactでの単体テストの方法を調査する"がチェックされないこと
  expect(getByLabelText('Reactでの単体テストの方法を調査する')).not.toBeChecked();
  // 前提確認:  Footer部分の「完了」の数字が2になっていること
  expect(getByText(/完了 2/)).toBeInTheDocument();
  // 前提確認:  Footer部分の「全部」の数字が4になっていること
  expect(getByText(/全部 4/)).toBeInTheDocument();

  // 操作：入力欄に'   'を入力
  userEvent.type(inputNode, '   ');
  expect(inputNode).toHaveValue('   ');

  // 操作：「Enter」を押下
  fireEvent.keyDown(inputNode, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13,
  });

  // 確認①: リスト一覧の最上部に「環境構築」のまま
  const todoList = getAllByRole('listitem');
  const todoTextLists = todoList.map((item) => item.textContent);
  expect(todoList.length).toBe(4);
  expect(todoTextLists[0]).toMatch(/環境構築/);

  // 確認②: Footer部分の「全部」の数字は4になる
  expect(getByText(/全部 4/)).toBeInTheDocument();
});
