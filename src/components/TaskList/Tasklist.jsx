import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Task from "./Task";
import Modal from "../Modal";
import { databases, ID } from "../../../appwrite-config";
import { toast } from "react-toastify";

function Tasklist() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const promise = databases.createDocument(
      "6742b42000277f9c263e",
      "67435a8a00308c45b8ea",
      ID.unique(),
      { task, taskStatus: "ToDo" }
    );

    promise.then(
      function (response) {
        fetchTasks();
        toast.success("Task added successfully!", {
          autoClose: 2000,
        });
      },
      function (error) {
        console.log(error);
        toast.error(`Error while adding task: ${error}`, {
          autoClose: 2000,
        });
      }
    );

    handleCloseModal();
    setTask("");
  };

  const handleChangeTaskStatus = (task) => {
    const updatedStatus = task.taskStatus === "ToDo" ? "Completed" : "ToDo";
    const promise = databases.updateDocument(
      "6742b42000277f9c263e",
      "67435a8a00308c45b8ea",
      task.$id,
      { taskStatus: updatedStatus }
    );

    promise.then(
      () => {
        fetchTasks();
        toast("Task status changed!", {
          autoClose: 2000,
        });
      },
      (error) =>
        toast.error(`Error while changing task status: ${error}`, {
          autoClose: 2000,
        })
    );
  };

  const handleDeleteTask = (task) => {
    const promise = databases.deleteDocument(
      "6742b42000277f9c263e",
      "67435a8a00308c45b8ea",
      task.$id
    );

    promise.then(
      () => {
        fetchTasks();
        toast.warn("Task deleted!", {
          autoClose: 2000,
        });
      },
      (error) =>
        toast.error(`Error while deleting task: ${error}`, {
          autoClose: 2000,
        })
    );
  };

  const fetchTasks = () => {
    const promise = databases.listDocuments(
      "6742b42000277f9c263e",
      "67435a8a00308c45b8ea"
    );
    promise.then(
      function (response) {
        setTasks(response.documents);
      },
      function (error) {
        console.log(error);
        toast.error(`Error while fetching tasks: ${error}`, {
          autoClose: 2000,
        });
      }
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div id="tasklist" className="pt-8 text-xl">
        <div className="flex items-center justify-between px-7">
          <h1 className="font-bold text-center">ToDo</h1>
          <button
            className="bg-black rounded-full p-1 w-fit"
            onClick={handleOpenModal}
          >
            <AiOutlinePlus size={19} color="white" />
          </button>
        </div>

        <div className="task-container h-4/5">
          <div className="rounded mx-4 h-full mt-11">
            <div className="mx-2">
              {tasks.map((task1) => {
                return (
                  <Task
                    key={task1.$id}
                    task={task1}
                    onChangeStatus={() => handleChangeTaskStatus(task1)}
                    onDelete={() => handleDeleteTask(task1)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add ToDo">
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label htmlFor="task" className="block text-gray-700 font-medium">
                Task <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="task"
                name="task"
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                placeholder="Enter Task"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Add Task
            </button>
          </form>

          <div className="">
            <img src="https://media1.tenor.com/m/bMljz73hH-UAAAAd/newgirl676.gif" alt="" className="w-full h-[290px] object-fill block mx-auto my-5" />
          </div>
        </Modal>
      )}
    </>
  );
}

export default Tasklist;
