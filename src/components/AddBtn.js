import React from "react";
import { Fab, Box, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  fabBottom: {
    position: 'fixed',
    bottom: '2ch',
  }
})

export function AddBtn() {
  const history = useHistory();
  const classes = useStyles()

  const handleClick = () => {
      history.push('/create')
  }
  return (
    <>
      <Box component="div" display="flex" justifyContent="center" p={3}>
        <Fab onClick={handleClick} variant="extended" color="primary" aria-label="add" className={classes.fabBottom}>
          <Add />
          Add Note
        </Fab>
      </Box>
    </>
  );
}
export default AddBtn;
