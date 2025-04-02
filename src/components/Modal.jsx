import { MdDeleteOutline } from "react-icons/md";
import React, { useState } from "react";
import DeletionModal from "./Main/DeletionModal";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  backgroundColor,
  color,
  createdOn,
  editedOn,
  handleDelete,
}) {
  if (!isOpen) return null;

  const [isModalOpen, setModalOpen] = useState(false);

  const confirmDelete = () => {
    handleDelete();
    setModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className="rounded-lg shadow-lg w-4/12 max-w-full min-h-96 relative"
          style={{
            background: `${backgroundColor ? backgroundColor : "white"}`,
            color: `${color ? color : "black"}`,
          }}
        >
          {/* Header */}
          {!backgroundColor && (
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 mb-1 hover:text-gray-700 transition-colors text-3xl"
                style={{
                  color: `${color ? color : "black"}`,
                }}
              >
                &times;
              </button>
            </div>
          )}

          {/* Body */}
          <div className="p-4">{children}</div>

          {/* Footer */}
          {backgroundColor ? (
            <div className="px-5 py-2 border-t flex items-center justify-between absolute w-full bottom-4">
              <div className="">
                <p className="text-sm">
                  Created On: {new Date(createdOn).toLocaleDateString()}
                </p>
                {editedOn !== null ? (
                  <p className="text-sm">
                    Edited On: {new Date(editedOn).toLocaleString()}
                  </p>
                ) : null}
              </div>

              <div className="">
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-white p-1 rounded-lg hover:bg-white hover:text-black transition"
                >
                  <MdDeleteOutline size={25} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Confirm Delete */}
      <DeletionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default Modal;
