import React from "react";
import { useDrag } from "react-dnd";
import { makeStyles } from "@material-ui/core";

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
        console.log(`You dropped ${item.book.title} into ${dropResult.name}!`);
        handleBookSelection(item.book);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const classes = useStyles({ isDragging });
  return (
    <div ref={drag} className={classes.bookRow}>
      {book.title}
      <img className={classes.img} src={book.imageURL} alt={"BookImage"}></img>
    </div>
  );
};

export default DraggableBook;
