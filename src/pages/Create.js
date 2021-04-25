import React, { useState } from "react";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  Radio,
  Typography,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Localbase from "localbase";
import { v4 as uuid } from "uuid";

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

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [idField, setIdField] = useState();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("general");

  let db = new Localbase("db");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }

    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      const id = uuid();
      db.collection("notes")
        .add({
          id,
          title,
          details,
          category,
        })
        .then(() => history.push("/"));
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
          Add New Note
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
            onChange={(e) => setTitle(e.target.value)}
            className={classes.field}
            label="Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={titleError}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            className={classes.field}
            label="Details"
            variant="outlined"
            color="secondary"
            multiline
            rows={6}
            fullWidth
            required
            error={detailsError}
          />
          <FormControl component="fieldset" className={classes.field}>
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              <TextField
                onChange={(e) => setCategory(e.target.value)}
                className={classes.field}
                label="Add New Category"
                variant="outlined"
                color="secondary"
                fullWidth
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
              className={classes.submitBtn}
              onClick={() => history.push("/")}
              variant="contained"
              color="default"
              endIcon={<DeleteOutlineIcon />}
            >
              Cancel
            </Button>
            <Button
              className={classes.submitBtn}
              type="submit"
              variant="contained"
              color="secondary"
              endIcon={<AddToPhotosIcon />}
            >
              Add
            </Button>
          </Grid>
        </form>
      </Container>
    </Container>
  );
}
