import React, { useState } from "react";
import { databases, ID } from "../../../appwrite-config";
import { toast } from "react-toastify";

function NoteInput({ handleCloseModal, setNotes }) {
  const [note, setNote] = useState({
    title: "",
    tagline: "",
    noteBody: "",
    color: "orange", // default color
    editedOn: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  // Handling color change from predefined color set
  const handleColorChange = (color) => {
    setNote((prev) => ({ ...prev, color }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.noteBody.trim()) {
      toast.warn("Note title and Note body are required!", {
        autoClose: 2000,
      });
      return;
    }

    const promise = databases.createDocument(
      "6742b42000277f9c263e",
      "6742b42d001ec2f9f2b2",
      ID.unique(),
      note
    );

    promise.then(
      function (response) {
        setNotes((prevNotes) => [response, ...prevNotes]);
        toast.success("Note added successfully!", {
          autoClose: 2000,
        });
      },
      function (error) {
        console.log(error);
        toast.error(`Error while adding note: ${error}`, {
          autoClose: 2000,
        });
      }
    );

    handleCloseModal();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Enter note title"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Tagline Input */}
        <div>
          <label htmlFor="tagline" className="block text-gray-700 font-medium">
            Tagline
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={note.tagline}
            onChange={handleChange}
            placeholder="Enter a short tagline"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Body Input */}
        <div>
          <label htmlFor="body" className="block text-gray-700 font-medium">
            Body <span className="text-red-500">*</span>
          </label>
          <textarea
            id="body"
            name="noteBody"
            value={note.noteBody}
            onChange={handleChange}
            placeholder="Write your note here..."
            rows={4}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
        </div>

        {/* Predefined Color Selection */}
        <div>
          <label className="block text-gray-700 font-medium">Note Color</label>
          <div className="flex gap-2 mt-2">
            {["orange", "yellow", "black", "dodgerBlue", "lightblue"].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange(color)}
                className={`w-8 h-8 rounded-full ${
                  color === note.color ? "border-2 border-black" : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default NoteInput;
