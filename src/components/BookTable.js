import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useBookManagerState } from "../context/bookManager";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  img: {
    height: 60,
    width: 60,
  },
});
const BookTable = ({ rows, actions = [] }) => {
  const classes = useStyles();
  const { tags: tagList } = useBookManagerState();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Tags</TableCell>
            <TableCell align="right">Image</TableCell>
            {!!actions.length && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.uuid}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                {row.tags.map((tagId) => tagList[tagId].name).join(", ")}
              </TableCell>
              <TableCell align="right">
                <img
                  className={classes.img}
                  src={row.imageURL}
                  alt={"imageURL"}
                />
              </TableCell>
              {!!actions.length && (
                <TableCell align="center">
                  {actions.map((action) => (
                    <Button
                      variant="contained"
                      color={action.colorType}
                      onClick={() => action.action(row)}
                    >
                      {action.text}
                    </Button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
