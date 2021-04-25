import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import AddBtn from "../components/AddBtn";
import Masonry from "react-masonry-css";
import Localbase from "localbase";

//
// TODO: edit function has to get the note object as a prop
// filter through notes based on title or other field
// update the changed fields only & setNotes with new data

//
// TODO: delete function has to update state properly

export default function Notes() {
  const history = useHistory();
  const [notes, setNotes] = useState([]);

  let db = new Localbase("db");

  useEffect(async () => {
    db.collection("notes")
      .get()
      .then((notes) => {
        if (notes != undefined) {
          setNotes(notes);
        }
      });
  }, []);

  const setGetNotes = () => {
    db.collection("notes")
      .get()
      .then((notes) => {
          setNotes(notes);
      });
  };

  const handleDelete = (note) => {
    db.collection("notes").doc({ id: note.id }).get().then(item => {
      db.collection("trash").add({
        id: item.id,
        title: item.title,
        details: item.details,
        category: item.category,
      })
    })
    .then(db.collection("notes").doc({ id: note.id }).delete());
    const newNotes = notes.filter(item => item.id != note.id)
    setNotes(newNotes)
  };

  const handleEdit = async ({ id }) => {
    history.push("/notes/" + id);
  };

  const breakpoints = {
    default: 3,
    960: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard
              notes={notes}
              note={note}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        ))}
      </Masonry>
      <AddBtn />
    </Container>
  );
}
