import React from "react";
import Note from "./Note/Note";

function Notes({ notes, onDelete }) {
  return (
    <div className="notes">
      {notes.map((note, index) => (
        <Note key={index} note={note} index={index} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default Notes;
