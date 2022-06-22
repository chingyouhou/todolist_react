import React,{ useRef}  from 'react'
import { Todo } from '../type/Todo'
import './index.css'

type IProps = {
  todolist: Todo[]
  setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Footer: React.FC<IProps> =({todolist,setTodolist})=>{
  const doneCount = todolist.reduce((previous,todo)=>previous + (todo.done ? 1 : 0),0)
  const allCount = todolist.length
  const checkboxRef = useRef<HTMLInputElement>(null)

  const isAllChecked = (): boolean => 
  !!(doneCount === allCount && allCount !== 0)

  const toggleCheckAll = (done:boolean) => {
    setTodolist(previous => previous.map(todoObj => ({...todoObj,done})            
    ))
  }

  const deleteDone = () => {
    if(window.confirm('削除しますか？'))
    setTodolist(previous => previous.filter(todoObj => !todoObj.done            
    ))
  }

  const domId = "htmlFor"

  return (
    <div className="todo-footer">
      <label htmlFor={domId}>
        <input
          type="checkbox"
          id={domId}
          ref={checkboxRef}
          onChange={() => toggleCheckAll(checkboxRef.current!.checked)}
          checked={isAllChecked()} />
        <span  style={{ color: 'white'}}>
        <span >完了 {doneCount}</span> / 全部 {allCount}</span>
      </label>
      <button  
        type="button"
        onClick={() => deleteDone()} 
        className="btn btn-danger">チェックしたタスクを削除
      </button>
    </div>
  )
}

export default Footer