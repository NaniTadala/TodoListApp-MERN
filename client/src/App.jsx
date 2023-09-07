import { Routes, Route } from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import HomePage from "./components/HomPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:card" element={<TodoList />} />
            </Routes>
        </>
    );
}

export default App;
