import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "../icons/ExpandMore";
import BookTable from "./BookTable";
import {
  useBookManagerState,
  useBookManagerDispatch,
  actionsType,
} from "../context/bookManager";
import ModalNewList from "./ModalNewList";
import DeleteIcon from "../icons/DeleteIcon";

const ListsContainer = () => {
  const { books, bookList } = useBookManagerState();
  const manageBookDispatcher = useBookManagerDispatch();
  const [isOpen, setOpen] = useState();
  const [expanded, setExpanded] = useState();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const onCloseModal = () => setOpen(false);
  const onDeleteLIst = (listName) => (event) => {
    event.stopPropagation();
    manageBookDispatcher({ type: actionsType.deleteList, listName });
  };
  return (
    <div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3">Lists of books</Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            type=""
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Create New List
          </Button>
        </Grid>
      </Grid>
      {Object.entries(bookList).map(([listName, booksUuid]) => {
        const listedBooks = booksUuid.map((uuid) =>
          books.find((book) => book.uuid === uuid)
        );
        return (
          <ExpansionPanel
            expanded={expanded === listName}
            onChange={handleChange(listName)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid container justify="space-between" alignItems={"center"}>
                <Grid item>
                  <Typography>{listName}</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="delete"
                    onClick={onDeleteLIst(listName)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <BookTable rows={listedBooks} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
      {isOpen && (
        <ModalNewList
          open={isOpen}
          onCloseModal={onCloseModal}
          books={books}
          listOfNames={Object.keys(bookList)}
        />
      )}
    </div>
  );
};

export default ListsContainer;
