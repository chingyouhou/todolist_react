import React,{ useState} from 'react'
import { Todo } from '../type/Todo'
import './index.css'

type IProps = {
    todolist: Todo[]
    setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Header: React.FC<IProps> = ({ todolist, setTodolist}) => {
    const [ input, setInput ] = useState('')
    
    const addTodo = (e: { keyCode: number }) => {
        if (e.keyCode === 13) {            
            if(!input.trim()) return
            const newTask: Todo = {
            id:  Date.now(),
            name: input,
            done: false}
            setTodolist([newTask, ...todolist])
            setInput('')
        }
    }

    const todoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div  className="todo-header">
            <input
                type="text"
                className="input"
                value={input}
                onChange={todoChange}
                onKeyDown={addTodo}
                placeholder="タスクを入力後、「Enter」を押してください。"/>
        </div>
    )
}

export default Header