import React, { useEffect, useState } from "react";
import Search from "./Search";
import NotesBox from "./NotesBox";
import Modal from "../Modal";
import Pagination from "./Pagination";
import Filter from "./Filter";
import { databases } from "../../../appwrite-config";
import { ToastContainer, toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";
import NotesModal from "./NotesModal";

function MainDashboard({ notes, setNotes, fetchNotes }) {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(notes.length / pageSize);

  const paginatedNotes = notes
    .slice()
    .sort((a, b) => b.isPinned - a.isPinned)
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Notes modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editableNote, setEditableNote] = useState(null);
  const [sortOption, setSortOption] = useState("Newest first");

  const handleOpenModal = (note) => {
    setSelectedNote(note);
    setEditableNote({ ...note });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
    setEditableNote(null);
    setModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    const updatedNote = {
      ...editableNote,
      [field]: value,
      editedOn: new Date().toLocaleString(),
    };
    // local state
    setEditableNote(updatedNote);

    // Appwrite database
    const promise = databases.updateDocument(
      "6742b42000277f9c263e",
      "6742b42d001ec2f9f2b2",
      updatedNote.$id,
      { [field]: value, editedOn: updatedNote.editedOn }
    );
    promise.then(
      function (response) {
        fetchNotes();
      },
      function (error) {
        console.error("Error updating document:", error);
        toast.error(`Error while editing note: ${error}`, {
          autoClose: 2000,
        });
      }
    );

    // Updating the `notes` array in local state
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.$id === updatedNote.$id ? { ...note, [field]: value } : note
      )
    );
  };

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

  const handleDelete = () => {
    const promise = databases.deleteDocument(
      "6742b42000277f9c263e",
      "6742b42d001ec2f9f2b2",
      selectedNote.$id
    );
    promise.then(
      function (response) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.$id !== selectedNote.$id)
        );
        toast.warn("Note deleted successfully!", {
          autoClose: 2000,
        });
      },
      function (error) {
        console.log(error);
        toast.error(`Error while deleting note: ${error}`, {
          autoClose: 2000,
        });
      }
    );

    handleCloseModal();
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedNotes = [...notes];

    switch (option) {
      case "Newest first":
        sortedNotes.sort(
          (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
        );
        break;
      case "Oldest first":
        sortedNotes.sort(
          (a, b) => new Date(a.$createdAt) - new Date(b.$createdAt)
        );
        break;
      case "Alphabetical A-Z":
        sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Alphabetical Z-A":
        sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setNotes(sortedNotes);
  };

  useEffect(() => {
    if (editableNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === editableNote.$id ? { ...editableNote } : note
        )
      );
    }
  }, [editableNote, setNotes]);

  return (
    <>
      <div className="w-screen p-8 ps-20">
        <div className="flex items-center justify-between mr-4">
          <Search notes={notes} setNotes={setNotes} fetchNotes={fetchNotes} />
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between mt-7 mr-4">
          <h1 className="text-5xl font-serif">Notes</h1>
          <Filter onSortChange={handleSortChange} />
        </div>

        <div id="notesContainer" className="flex gap-6 flex-wrap mt-7">
          {paginatedNotes.length > 0 ? (
            paginatedNotes.map((note) => (
              <NotesBox
                key={note.$id}
                note={note}
                setNotes={setNotes}
                fetchNotes={fetchNotes}
                onClick={() => handleOpenModal(note)}
              />
            ))
          ) : (
            <img className="w-1/2 block mx-auto" src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1732522818~exp=1732526418~hmac=3681f9ce6d27329a4e89847625614568b04262bf435dedae839f6e51a7d3725c&w=740" />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Notes Modal */}
      {isModalOpen && editableNote && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedNote.title}
          backgroundColor={selectedNote.color}
          color={getTextColor(selectedNote.color)}
          createdOn={new Date(selectedNote.$createdAt).toLocaleDateString()}
          editedOn={selectedNote.$updatedAt}
          fetchNotes={fetchNotes}
          handleDelete={handleDelete}
        >
          {/* This is Modal content and not actual modal, actual modal is the above one */}
          <NotesModal
            editableNote={editableNote}
            handleInputChange={handleInputChange}
            getTextColor={getTextColor}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      )}

      <ToastContainer />
    </>
  );
}

export default MainDashboard;
