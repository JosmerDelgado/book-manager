import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useBookManagerDispatch,
  actionsType,
  useBookManagerState,
} from "../context/bookManager";
import { useModalDispatch, modalActionTypes } from "../context/bookModal";
import BookTable from "./BookTable";

const useStyles = makeStyles({
  formControl: {
    margin: 8,
    minWidth: 120,
  },
  button: {
    margin: 8,
  },
});

const BookFilteredTable = ({ rows }) => {
  const bookManagerDispatch = useBookManagerDispatch();
  const { tags: tagList } = useBookManagerState();
  const [tagIndex, setTagIndex] = useState("");
  const [page, setPage] = useState(1);
  const modalDipatch = useModalDispatch();
  const filteredRows =
    tagIndex !== "" ? rows.filter((row) => row.tags.includes(tagIndex)) : rows;
  const onEdit = (book) => {
    modalDipatch({ type: modalActionTypes.openEditBook, book });
  };
  const onDeleteBook = (values) => {
    console.log({ myCondition: (filteredRows.length - 1) % 5 === 0 });
    if ((filteredRows.length - 1) % 5 === 0) {
      setPage(page - 1);
    }
    bookManagerDispatch({ type: actionsType.deleteBook, book: values });
  };
  const handleChange = (event) => {
    setTagIndex(event.target.value);
  };
  const classes = useStyles();

  const totalPages = Math.ceil(filteredRows.length / 5);
  const paginatedRow = filteredRows.slice((page - 1) * 5, page * 5);
  console.log({ paginatedRow, filteredRows });
  return (
    <>
      <Grid container alignItems={"flex-end"}>
        <Grid item xs={4}>
          <Typography>Filter By:</Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Tag</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tagIndex}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tagList.map((tag, index) => {
                return (
                  tag.count > 0 && (
                    <MenuItem key={index} value={index}>
                      {tag.name}
                    </MenuItem>
                  )
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <BookTable
        rows={paginatedRow}
        actions={[
          { colorType: "primary", action: onEdit, text: "Edit" },
          { colorType: "secondary", action: onDeleteBook, text: "Delete" },
        ]}
      />
      {filteredRows.length >= 5 && (
        <Grid container justify="space-between">
          <Grid item>
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </Button>
          </Grid>
          <Grid item>
            {page}/{totalPages}
          </Grid>
          <Grid item>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BookFilteredTable;
