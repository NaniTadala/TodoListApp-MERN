const TodoForm = ({ description, setDescription, handleAddTodo }) => {
    return (
        <div className="flex mt-10 gap-4">
            <input
                className="p-3 w-full text-stone-900 rounded-lg bg-stone-200 border-gray-500 border"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <button
                className="rounded-lg p-3 font-bold text-stone-900 bg-emerald-500"
                onClick={handleAddTodo}
            >
                Add
            </button>
        </div>
    );
};

export default TodoForm;
