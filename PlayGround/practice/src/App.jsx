import { useEffect } from "react";
import Note from "./components/Note";
import { useState } from "react";
import Content from "../../../part2/courseinfo/src/Components/Content";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const noteToShow = showAll ? notes : notes.filter((note) => note.important);

  console.log(noteToShow);
  const addNote = function (e) {
    e.preventDefault();
    console.log("button clicked", e.target);
    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };

    setNotes(notes.concat(noteObj));
    setNewNote("");
  };

  const handleNewNote = function (e) {
    console.log(e.target);
    setNewNote(e.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button
          onClick={(e) => {
            setShowAll(!showAll);
          }}
        >
          {showAll ? "Show imp" : "Show all"}
        </button>
        +
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNewNote} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
