import { BsPinAngleFill } from "react-icons/bs";
import { BsPinAngle } from "react-icons/bs";
import React, { useState } from "react";
import { databases } from "../../../appwrite-config";
import { toast } from "react-toastify";

function NotesBox({ note, onClick, setNotes, fetchNotes }) {
  const [isHovered, setIsHovered] = useState(false);

  // Function to calculate text color
  const getColorRGB = (colorName) => {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = colorName;
    return ctx.fillStyle;
  };
  const getTextColor = (bgColor) => {
    let r, g, b;
    const color = getColorRGB(bgColor); 

    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    } else if (color.startsWith("rgb")) {
      [r, g, b] = color.match(/\d+/g).map(Number);
    } else {
      return "#FFFFFF";
    }

    // Relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };
  const textColor = getTextColor(note.color);

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const handlePinNote = (e) => {
    e.stopPropagation();

    const promise = databases.updateDocument(
      "6742b42000277f9c263e",
      "6742b42d001ec2f9f2b2",
      note.$id,
      { isPinned: true }
    );
    promise.then(
      function (response) {
        fetchNotes();
        toast("Note pinned!", {
          autoClose: 2000,
        });
      },
      function (error) {
        console.error("Error updating document:", error);
        toast.error(`Error while pinning the note: ${error}`, {
          autoClose: 2000,
        });
      }
    );

    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.$id === note.$id ? { ...prevNote, isPinned: true } : prevNote
      )
    );
  };

  const handleRemovePin = (e) => {
    e.stopPropagation();

    const promise = databases.updateDocument(
      "6742b42000277f9c263e",
      "6742b42d001ec2f9f2b2",
      note.$id,
      { isPinned: false }
    );
    promise.then(
      function (response) {
        fetchNotes();
      },
      function (error) {
        console.error("Error updating document:", error);
        toast.error(`Error while removing pinned note: ${error}`, {
          autoClose: 2000,
        });
      }
    );

    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote.$id === note.$id ? { ...prevNote, isPinned: false } : prevNote
      )
    );
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-[290px] h-[250px] rounded-md p-3 relative cursor-pointer"
      style={{
        backgroundColor: note.color,
        color: textColor,
      }}
    >
      {/* Pin or Unpin Button */}
      {!note.isPinned && isHovered && (
        <button
          className="absolute right-2 top-3 px-2 py-1 rounded transition"
          onClick={(e) => {
            handlePinNote(e);
          }}
        >
          <BsPinAngle size={22} />
        </button>
      )}
      {note.isPinned && (
        <button
          className="absolute right-2 top-3 px-2 py-1 rounded transition"
          onClick={(e) => {
            handleRemovePin(e);
          }}
        >
          <BsPinAngleFill size={22} />
        </button>
      )}

      {/* Note Content */}
      <div className="content">
        <h3 className="text-lg font-bold" style={{ color: textColor }}>
          {note.title}
        </h3>
        <span className="text-sm" style={{ color: textColor }}>
          {note.tagline}
        </span>
        <p
          className="mt-7 text-sm h-36 overflow-hidden"
          style={{ color: textColor }}
        >
          {truncateText(note.noteBody, 280)}
        </p>
      </div>
    </div>
  );
}

export default NotesBox;
