import { MdDeleteOutline } from "react-icons/md";
import React from "react";

function Task({ task, onChangeStatus, onDelete }) {
  const isCompleted = task.taskStatus === "Completed";

  const handleChangeStatus = () => {
    onChangeStatus();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div
      className={`relative flex items-center justify-between text-base gap-2 mt-3 ${
        isCompleted ? "bg-green-400" : "bg-orange-400"
      } text-white p-2 rounded`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleChangeStatus}
          className="w-4 h-4 rounded-lg border-none outline-none cursor-pointer"
        />
        <span className={isCompleted ? "line-through" : ""}>{task.task}</span>
      </div>
      <button className="cursor-pointer" onClick={handleDelete}>
        <MdDeleteOutline size={22} />
      </button>
    </div>
  );
}

export default Task;
