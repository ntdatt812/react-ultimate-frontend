import { useState } from "react"

const TodoNew = ({ addNewTodo }) => {
    const [valueInput, setValueInput] = useState("")

    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handleOnChange = (value) => {
        setValueInput(value)
    }
    return (
        <div className='todo-new'>
            <input
                type="text"
                onChange={(event) => {
                    handleOnChange(event.target.value)
                }}
                value={valueInput}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleClick()
                    }
                }}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={() => {
                    handleClick()
                }}
            >Add</button>
        </div>
    );
}

export default TodoNew;