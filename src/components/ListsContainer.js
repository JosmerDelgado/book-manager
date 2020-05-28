import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "../icons/ExpandMore";
import BookTable from "./BookTable";
import { useBookManagerState } from "../context/bookManager";
import ModalNewList from "./ModalNewList";

const ListsContainer = () => {
  const { books, bookList } = useBookManagerState();
  const [isOpen, setOpen] = useState();
  const [expanded, setExpanded] = useState();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const onCloseModal = () => setOpen(false);
  const onDeleteBook = (data) => {
    console.log({ data });
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
              <Typography>{listName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <BookTable
                rows={listedBooks}
                actions={[
                  {
                    colorType: "secondary",
                    action: onDeleteBook,
                    text: "Delete",
                  },
                ]}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
      <ModalNewList open={isOpen} onCloseModal={onCloseModal} books={books} />
    </div>
  );
};

export default ListsContainer;
