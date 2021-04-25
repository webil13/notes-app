import React, { useState, useEffect, useRef } from "react";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Localbase from "localbase";

const useStyles = makeStyles({
  header: {
    width: "100%",
    padding: ".5em 0",
    textAlign: "center",
  },
  backBtn: {
    marginTop: "1em",
  },
  field: {
    margin: "1ch 0",
  },
  currentCategory: {
    textAlign: "center",
    fontSize: "2em",
  },
  form: {
    display: "grid",
    placeItems: "center",
  },
  submitBtn: {
    padding: "1em",
    marginTop: "1em",
    marginBottom: "1em",
  },
});

export default function Edit() {
  const classes = useStyles();
  const history = useHistory();
  const [singleNote, setSingleNote] = useState("");
  const [newNote, setNewNote] = useState("");
  const input = React.createRef();

  let loc = window.location.pathname.split("/");
  const noteId = loc[loc.length - 1];

  let db = new Localbase("db");

  useEffect(() => {
    db.collection("notes")
      .doc({ id: noteId })
      .get()
      .then((document) => {
        setSingleNote(document);
        setNewNote(document);
      });
  }, []);

  const handleSubmit = (e, noteId) => {
    e.preventDefault();
    if (singleNote == newNote) {
      db.collection("notes")
        .doc({ id: singleNote.id })
        .update({
          title: singleNote.title,
          details: singleNote.details,
          category: singleNote.category,
        })
        .then(() => history.push("/"));
      //   fetch("http://localhost:8000/notes/" + id, {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(singleNote),
      //   }).then(() => history.push("/"));
    } else {
      if (newNote.title && newNote.title != singleNote.title) {
        singleNote.title = newNote.title;
      } else if (newNote.details && newNote.details != singleNote.details) {
        singleNote.details = newNote.details;
      } else if (newNote.category && newNote.category != singleNote.category) {
        singleNote.category = newNote.category;
      }
      db.collection("notes")
        .doc({ id: singleNote.id })
        .update({
          title: singleNote.title,
          details: singleNote.details,
          category: singleNote.category,
        })
        .then(() => history.push("/"));
      //     fetch("http://localhost:8000/notes/" + id, {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(singleNote),
      //   }).then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Container display="flex">
        <Typography
          className={classes.header}
          variant="h4"
          component="h1"
          color="secondary"
        >
          Edit Note
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <TextField
            defaultValue={singleNote.title}
            value={newNote.title}
            onChange={(e) => setNewNote({ title: e.target.value })}
            className={classes.field}
            label="Title"
            variant="outlined"
            color="secondary"
            multiline
            fullWidth
            focused
            required
          />
          <TextField
            defaultValue={singleNote.details}
            value={newNote.details}
            onChange={(e) => setNewNote({ details: e.target.value })}
            className={classes.field}
            label="Details"
            variant="outlined"
            color="secondary"
            multiline
            rows={6}
            fullWidth
            focused
            required
          />
          <FormControl component="fieldset" className={classes.field}>
            <FormLabel component="legend">Category</FormLabel>
            <TextField
              defaultValue={singleNote.category}
              value={newNote.category}
              onChange={(e) => setNewNote({category: e.target.value})}
              className={classes.field}
              variant="outlined"
              color="secondary"
              fullWidth
            />
            <RadioGroup
              onChange={(e) => setNewNote({ category: e.target.value })}
              row
            >
              <FormControlLabel
                value="general"
                control={<Radio />}
                label="General"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminders"
              />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Button
              onClick={() => history.push("/")}
              variant="contained"
              color="default"
              endIcon={<ClearIcon />}
            >
              Cancel
            </Button>
            <Button
              className={classes.submitBtn}
              type="submit"
              variant="contained"
              color="secondary"
              endIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </form>
      </Container>
    </Container>
  );
}
