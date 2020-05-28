import React, { useState } from "react";
import { Modal, Grid, TextField, makeStyles } from "@material-ui/core";
import { modalStyles } from "./modal.styles";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBook from "./DraggableBook";
import DroppableList from "./DroppableList";

const useStyles = makeStyles((theme) => ({
  ...modalStyles(theme),

  bookContainer: { height: "400px", overflow: "hidden" },
  bookList: { overflow: "auto", textAlign: "justify", height: "100%" },
}));

const ModalNewList = ({ open, onCloseModal, books }) => {
  const [title, setTitle] = useState();
  const [selectedBooks, setSelectedBooks] = useState([]);
  const classes = useStyles();
  const handleBookSelection = (book) => {
    setSelectedBooks([...selectedBooks, book]);
  };
  const handleChange = (event) => setTitle(event.targer.value);
  const unselectedBooks =
    selectedBooks.length !== books.length
      ? books.filter(
          (book) =>
            selectedBooks.length === 0 ||
            selectedBooks.some(
              (selectedBook) => book.uuid !== selectedBook.uuid
            )
        )
      : [];
  return (
    <Modal open={open} onClose={onCloseModal}>
      <DndProvider backend={HTML5Backend}>
        <div className={classes.paper}>
          <TextField
            value={title}
            onChange={handleChange}
            id="listName"
            name="listName"
            label="List Name"
          />
          <Grid container className={classes.bookContainer}>
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
          </Grid>
        </div>
      </DndProvider>
    </Modal>
  );
};

export default ModalNewList;
