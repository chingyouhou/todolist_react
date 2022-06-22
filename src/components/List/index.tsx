import React from 'react'
import Item from '../Item/index'
import { Todo } from '../type/Todo'
import './index.css'

type IProps = {
    todolist: Todo[]
    setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>
}

const List: React.FC<IProps> =({todolist,setTodolist})=>{

    const handleDelete = (list: Todo) => {
    if(window.confirm('削除しますか？'))
    setTodolist(previous => previous.filter(todoObj =>
        todoObj.id !== list.id
    ))
}

    return (
        <div >                
            <ul  
            className="todo-main">
                { todolist.map(todo => (
                    <Item
                        key={todo.id}
                        todo={todo}
                        setTodolist={setTodolist}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    )
}

export default List