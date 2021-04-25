import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import TrashCard from "../components/TrashCard";
import Masonry from "react-masonry-css";
import Localbase from "localbase";

export function Trash() {
  const history = useHistory();
  const [trash, setTrash] = useState([]);

  let db = new Localbase("db");

  useEffect(() => {
    db.collection("trash")
      .get()
      .then((trash) => {
        if(trash != undefined || trash != []){
          setTrash(trash)
        }
      });
  }, []);

  const setGetTrash = () => {
    db.collection("trash")
    .get()
    .then((trash) => {
      if(trash != undefined || trash != []){
        setTrash(trash)
      }
    });
  }

  const handleDelete = async (id) => {
    db.collection("trash")
      .doc({ id: id })
      .delete()
      .then(() => history.push("/trash"))
      .then(setGetTrash)
  };

  const handleRestore = (id, note) => {
    const { title, details, category } = note;
    db.collection("notes")
      .add({
        title,
        details,
        category,
        id,
      })
      .then(handleDelete(id))
      .then(() => history.push("/"))
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
        {trash != undefined ?
        trash.map((note) => (
          <div key={note.id}>
            <TrashCard
              note={note}
              handleDelete={handleDelete}
              handleRestore={handleRestore}
            />
          </div>
        )) : null}
      </Masonry>
    </Container>
  );
}

export default Trash;
