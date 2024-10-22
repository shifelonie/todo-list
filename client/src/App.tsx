import { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/tasks");
      setTasks(response.data);
      setError(null);
    } catch (error) {
      setError("Gagal untuk mengambil data dari table tasks, Coba lagi nanti.");
      console.error("Error dalam mengambil data :", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post("http://localhost:3001/api/tasks", {
        title: newTask,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
      setError(null);
    } catch (error) {
      setError(
        "Gagal untuk menambahkan data ke dalam table tasks, Coba lagi nanti."
      );
      console.error("Error dalam menambahkan data :", error);
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/tasks/${id}`,
        updates
      );
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
      setEditingTask(null);
      setError(null);
    } catch (error) {
      setError(
        "Gagal untuk mengupdate data dalam table tasks, Coba lagi nanti."
      );
      console.error("Error dalam mengupdate data :", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      setError(null);
    } catch (error) {
      setError(
        "Gagal untuk menghapus data dalam table tasks, Coba lagi nanti."
      );
      console.error("Error dalam menghapus task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Todo List Application
        </h1>
        <h4 className="text-2xl text-center mb-5 text-gray-800">
          FE : React + Vite + TS
        </h4>
        <h4 className="text-2xl text-center mb-5 text-gray-800">
          BE : Express.JS
        </h4>
        <h4 className="text-2xl text-center mb-5 text-gray-800">
          DB : PostgreSQL
        </h4>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-200"
          >
            <PlusCircle size={24} />
          </button>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded ${
              filter === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Completed
          </button>
        </div>

        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center bg-gray-100 p-3 rounded-md"
            >
              {editingTask?.id === task.id ? (
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  className="flex-grow p-1 mr-2 border border-gray-300 rounded"
                />
              ) : (
                <span
                  className={`flex-grow ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
              )}
              <div className="flex space-x-2">
                {editingTask?.id === task.id ? (
                  <>
                    <button
                      onClick={() =>
                        updateTask(task.id, { title: editingTask.title })
                      }
                      className="text-green-500 hover:text-green-700"
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        updateTask(task.id, { completed: !task.completed })
                      }
                      className={`${
                        task.completed ? "text-green-500" : "text-gray-500"
                      } hover:text-green-700`}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
