import React,{useState,useRef} from 'react'
import { Todo } from '../type/Todo'
import './index.css'

type IProps = {
    todo: Todo
    setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>
    handleDelete: (todo: Todo) => void
}

const Item: React.FC<IProps> = ({ todo,setTodolist, handleDelete }) => {
    const [mouseflag, setMouseFlag] = useState(false)
    const checkboxRef = useRef<HTMLInputElement>(null)

    const toggleTodo = (id: number, done: boolean) => {
        setTodolist(previous => previous.map(todoObj => {
            if (todoObj.id ===id) return {...todoObj,done}
            
            return todoObj
            }
        ))
    }

    const itemhtmlFor = `${todo.id}`

    return (
        <li className={todo.done ? 'done' : ''}
            style={{ backgroundColor: mouseflag ? '#ddd' : 'white' }}
            onMouseEnter={() => setMouseFlag(true)}
            onMouseLeave={() => setMouseFlag(false)}>
            <label htmlFor={itemhtmlFor}> 
                <input
                    id={itemhtmlFor}
                    type="checkbox"                  
                    className="checkbox-input"
                    ref={checkboxRef}
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id, checkboxRef.current!.checked)} />
                <span className="checkbox-label">{ todo.name }</span>
            </label>
            <button
                type="button"
                onClick={() => handleDelete(todo)}
                className="btn btn-danger" 
                style={{display: mouseflag?'block':'none' }}
                >削除</button>
        </li>
    )
}

export default Item
