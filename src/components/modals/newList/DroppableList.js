import React from "react";
import { useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  dropZone: {
    height: "100%",
    backgroundColor: (props) => {
      if (props.canDrop && props.isOver) {
        return "green";
      } else if (props.canDrop) {
        return "yellow";
      }
      return "#fff";
    },
  },
  title: { textAlign: "center" },
}));

const DroppableList = ({ selectedBooks }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "book",
    drop: () => ({ name: "New List" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const classes = useStyles({ canDrop, isOver });
  return (
    <div ref={drop} className={classes.dropZone}>
      <div className={classes.title}>Drag and Drop books Here</div>
      {selectedBooks.map((book) => (
        <div>{book.title}</div>
      ))}
    </div>
  );
};

export default DroppableList;
