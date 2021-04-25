import React from "react";
import {
  Avatar,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { yellow, green, pink, blue, purple } from '@material-ui/core/colors'


const useStyles = makeStyles({
  avatar: {
    background: (note) => {
      if(note.category == 'work'){
        return pink[100]
      } else if(note.category == 'reminders'){
        return yellow[300]
      } else if(note.category == 'todos'){
        return green[100]
      } else if(note.category == 'general'){
        return purple[100]
      } else {
        return blue[100]
      }
    }
  }
})


export function NoteCard({ notes, note, handleDelete, handleEdit }) {

  const classes = useStyles(note)


  return (
    <>
      <Card elevation={1}>
        <CardHeader
          avatar={<Avatar className={classes.avatar} aria-label="note title">{note.category[0].toUpperCase()}</Avatar>}
          action={
            <CardActions disableSpacing>
              <IconButton onClick={() => handleEdit(note)} aria-label="edit">
                <EditOutlined />
              </IconButton>
              <IconButton onClick={() => handleDelete(note)} aria-label="delete">
                <DeleteOutlined />
              </IconButton>
            </CardActions>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary">
                {note.details}
            </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default NoteCard;
