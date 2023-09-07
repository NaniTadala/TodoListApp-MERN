import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
let url = "http://localhost:3000/";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");
    const { card } = useParams();

    const fetchTodos = async () => {
        try {
            const response = await axios.get(url + card);
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        try {
            await axios.post(
                url + card,
                { description: description },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setDescription("");
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url + card}/${id}`);
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="bg-stone-800 w-[32rem] min-h-[50rem] p-10 mx-10 my-20 rounded-xl">
            <h1 className="text-emerald-500 text-2xl font-semibold">
                {card.charAt(0).toUpperCase() + card.substring(1) + " TodoList"}
            </h1>
            <TodoForm
                description={description}
                setDescription={setDescription}
                handleAddTodo={handleAddTodo}
            />

            <ul className="mt-10">
                {todos.map(({ _id, description, isCompleted }) => (
                    <TodoItem
                        key={_id}
                        id={_id}
                        description={description}
                        onDelete={handleDelete}
                        fetchTodos={fetchTodos}
                        isCompleted={isCompleted}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
