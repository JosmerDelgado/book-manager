import React from "react";
import { useDrag } from "react-dnd";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  img: {
    height: 60,
    width: 60,
  },
  bookRow: {
    opacity: (props) => (props.isDragging ? 0.4 : 1),
  },
}));

const DraggableBook = ({ book, handleBookSelection }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { book, type: "book" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handleBookSelection(item.book);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const classes = useStyles({ isDragging });
  return (
    <Grid
      container
      justify={"space-between"}
      ref={drag}
      className={classes.bookRow}
    >
      <Grid item xs={9}>
        <Typography>{book.title}</Typography>
      </Grid>
      <Grid item xs={3}>
        <img
          className={classes.img}
          src={book.imageURL}
          alt={"BookImage"}
        ></img>
      </Grid>
    </Grid>
  );
};

export default DraggableBook;
