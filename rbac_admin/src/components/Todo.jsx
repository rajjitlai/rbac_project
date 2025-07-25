import { useEffect, useState } from "react";
import apiService from "../api/rbac";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [updateId, setUpdateId] = useState(null)

    const fetchTodos = async () => {
        try {
            const response = await apiService.getTodos();
            console.log('Fetched todos:', response.data);
            setTodos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Failed to fetch todos:', error.response?.data || error.message);
            setTodos([]);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const handleCreateTodo = async () => {
        try {
            if (!title.trim()) {
                alert("Title can't be empty");
                return;
            }
            await apiService.createTodo(title);
            alert('Todo created successfully');
            setTitle('');
            fetchTodos()
        } catch (error) {
            console.error('Failed to create todo:', error);
        }
    };

    const handleUpdateTodo = async (id) => {
        try {
            if (!title.trim()) {
                alert("Title can't be empty");
                return;
            }
            await apiService.updateTodo(id, title);
            alert('Todo updated successfully');
            setTitle('');
            setUpdateId(null);
            fetchTodos()
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await apiService.deleteTodo(id);
            alert('Todo deleted successfully');
            fetchTodos()
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-semibold mb-4">Todo</h3>
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Todo Title"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        onClick={updateId !== null ? () => handleUpdateTodo(updateId) : handleCreateTodo}
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        {updateId !== null ? 'Update Todo' : 'Create Todo'}
                    </button>
                </div>
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li key={todo.id} className="flex justify-between items-center">
                            <span>{todo.title}</span>
                            <div>
                                <button
                                    onClick={() => {
                                        setTitle(todo.title);
                                        setUpdateId(todo.id);
                                    }}
                                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="bg-red-500 text-white p-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo