import React from "react";
import { Modal, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  },
}));

const ModalBookForm = ({ openModal, handleClose }) => {
  const classes = useStyles();
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Grid container className={classes.paper}>
        <Grid item xs={12}>
          Book Form
        </Grid>
        <Grid item xs={6}>
          <TextField label="title" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="description" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="tags" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="imageURL" />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalBookForm;
