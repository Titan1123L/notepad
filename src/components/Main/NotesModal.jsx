import React from "react";

function NotesModal({ editableNote, handleInputChange, getTextColor, handleCloseModal }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <textarea
          type="text"
          className="font-semibold outline-none bg-transparent w-full overflow-hidden whitespace-normal break-words resize-none"
          placeholder="Title"
          value={editableNote.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          style={{
            color: getTextColor(editableNote.color),
            backgroundColor: editableNote.color,
          }}
        />
        <button
          className="text-gray-500 mb-1 hover:text-gray-700 transition-colors text-4xl"
          onClick={handleCloseModal}
        >
          &times;
        </button>
      </div>
      <input
        type="text"
        className="font-semibold outline-none bg-transparent w-full"
        placeholder="Tagline"
        value={editableNote.tagline}
        onChange={(e) => handleInputChange("tagline", e.target.value)}
        style={{
          color: getTextColor(editableNote.color),
          backgroundColor: editableNote.color,
        }}
      />
      <textarea
        className="outline-none bg-transparent w-full h-48 mt-5 resize-none"
        placeholder="Note"
        value={editableNote.noteBody}
        onChange={(e) => handleInputChange("noteBody", e.target.value)}
        style={{
          color: getTextColor(editableNote.color),
          backgroundColor: editableNote.color,
        }}
      />
    </div>
  );
}

export default NotesModal;
