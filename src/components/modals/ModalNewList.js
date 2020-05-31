import React, { useState } from "react";
import {
  Modal,
  Grid,
  TextField,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { modalStyles } from "./modal.styles";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBook from "./newList/DraggableBook";
import DroppableList from "./newList/DroppableList";
import { useBookManagerDispatch, actionsType } from "../../context/bookManager";

const useStyles = makeStyles((theme) => ({
  ...modalStyles(theme),

  bookContainer: { height: "400px", overflow: "hidden" },
  bookList: {
    overflowY: "auto",
    overflowX: "hidden",
    textAlign: "justify",
    height: "100%",
  },
}));

const ModalNewList = ({ open, onCloseModal, books, listOfNames }) => {
  const [title, setTitle] = useState();
  const [selectedBooks, setSelectedBooks] = useState([]);
  const classes = useStyles();
  const handleBookSelection = (book) => {
    setSelectedBooks([...selectedBooks, book]);
  };
  const bookManagerDispatcher = useBookManagerDispatch();
  const handleSubmit = () => {
    bookManagerDispatcher({
      type: actionsType.newList,
      listOfBooks: { [title]: selectedBooks },
    });
    onCloseModal();
  };
  const handleChange = (event) => setTitle(event.target.value);
  const unselectedBooks =
    selectedBooks.length !== books.length
      ? books.filter(
          (book) =>
            !selectedBooks.some(
              (selectedBook) => selectedBook.uuid === book.uuid
            )
        )
      : [];
  const error = listOfNames.includes(title);
  return (
    <Modal open={open} onClose={onCloseModal}>
      <div className={classes.paper}>
        <Typography variant="h5"> {"Create new list of Books"}</Typography>
        <Grid container justify={"space-between"} alignItems={"center"}>
          <Grid item>
            <TextField
              value={title}
              onChange={handleChange}
              id="listName"
              name="listName"
              label="List Name"
              error={error}
              helperText={error && "This is list name is already taken"}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={error || !title || selectedBooks.length === 0}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </Grid>
        </Grid>

        <Grid container className={classes.bookContainer}>
          <DndProvider backend={HTML5Backend}>
            <Grid item xs={6} className={classes.bookList}>
              List
              {unselectedBooks.map((book) => (
                <DraggableBook
                  book={book}
                  handleBookSelection={handleBookSelection}
                />
              ))}
            </Grid>
            <Grid item xs={6}>
              <DroppableList selectedBooks={selectedBooks} />
            </Grid>
          </DndProvider>
        </Grid>
      </div>
    </Modal>
  );
};

export default ModalNewList;
