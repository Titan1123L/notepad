import React from "react";

function DeletionModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-[300px]">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletionModal;