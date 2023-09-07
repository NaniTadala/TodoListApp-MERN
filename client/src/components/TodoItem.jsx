import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
let url = "http://localhost:3000/";

const TodoItem = ({ id, description, onDelete, fetchTodos, isCompleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [upadatedDescription, setUpdatedDescription] = useState(description);
    const { card } = useParams();
    const [isChecked, setIsChecked] = useState(true);

    const descriptionStyle = {
        textDecoration: isCompleted ? "line-through" : "none",
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    async function handleUpdate(id) {
        try {
            await axios.put(
                `${url + card}/${id}`,
                { description: upadatedDescription },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setIsEditing(false);
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleCheckBox(id) {
        try {
            await axios.post(
                `${url + card}/${id}`,
                { isCompleted: isChecked },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
        setIsChecked(!isChecked);
    }

    return (
        <div>
            {isEditing ? (
                <div className="p-4 text-left bg-stone-700 my-4 rounded-lg flex justify-between items-center">
                    <input
                        className="bg-stone-700 text-lg"
                        value={upadatedDescription}
                        onChange={(event) =>
                            setUpdatedDescription(event.target.value)
                        }
                    />
                    <button
                        className="p-2 mr-2 text-sm font-bold"
                        onClick={() => handleUpdate(id)}
                    >
                        Update
                    </button>
                </div>
            ) : (
                <div className="p-4 text-lg text-left bg-stone-700 my-4 rounded-lg flex justify-between items-center">
                    <div className="flex gap-4">
                        <input
                            checked={isCompleted ? true : false}
                            type="checkbox"
                            onChange={() => handleCheckBox(id)}
                        />
                        <span style={descriptionStyle}>{description}</span>
                    </div>
                    <div>
                        <button
                            className="p-2 mr-2 text-sm font-bold"
                            onClick={() => handleEdit(id)}
                        >
                            Edit
                        </button>
                        <button
                            className="p-2 text-sm font-bold"
                            onClick={() => onDelete(id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
