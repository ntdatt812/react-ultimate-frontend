
const TodoData = ({ todoData, deleteTodo }) => {

    const handleClickDelete = (id) => {
        deleteTodo(id)
    }

    return (
        <div className='todo-data'>
            {todoData.map((item) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>
                        <button
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClickDelete(item.id)}
                        >Delete</button>
                    </div>
                );
            })}
        </div>

    );
}

export default TodoData;