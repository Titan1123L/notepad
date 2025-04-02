import { RxReset } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import ColoredButton from "./ColoredButton";
import Modal from "../Modal";
import NoteInput from "./NoteInput";
import Logo from "../../assets/images/logo.png";

function Sidebar({ setNotes, notes, fetchNotes }) {
  const noteColors = ["orange", "yellow", "black", "dodgerBlue", "lightblue"];
  const [isFiltered, setIsFiltered] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleColoredButtonClick = (color) => {
    const filtered = notes.filter((note) => note.color === color);
    setNotes(filtered);
    setIsFiltered(true);
  };

  const resetFilter = () => {
    fetchNotes();
  };

  return (
    <>
      <div id="sidebar" className="pt-8 text-xl">
        <a href="#" className="block">
          <img
            src={Logo}
            alt="NoteKeeping Logo"
            className="w-16 mx-auto block"
          />
        </a>
        <div className="mt-24 h-screen">
          <button
            className="bg-black rounded-full block w-fit p-2 mx-auto"
            onClick={handleOpenModal}
          >
            <AiOutlinePlus size={34} color="white" />
          </button>

          <div className="mt-9">
            {noteColors.map((color) => {
              return (
                <ColoredButton
                  key={color}
                  color={color}
                  handleClick={() => handleColoredButtonClick(color)}
                />
              );
            })}

            {isFiltered ? (
              <button
                className="block mx-auto mt-4 hover:bg-slate-400 transition-all rounded-full p-1"
                onClick={resetFilter}
              >
                <RxReset size={19} />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Note">
          <NoteInput handleCloseModal={handleCloseModal} setNotes={setNotes} />
        </Modal>
      )}
    </>
  );
}

export default Sidebar;
