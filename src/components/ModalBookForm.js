import React from "react";
import { Modal, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChipInput from "material-ui-chip-input";
import { useFormik } from "formik";
import { useBookManagerDispatch, actionsType } from "../context/bookManager";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  },
}));

const ModalBookForm = ({ openModal, bookInfo, handleClose, tagList }) => {
  const classes = useStyles();
  const bookManagerDispatcher = useBookManagerDispatch();
  const { values, handleChange, handleReset, submitForm } = useFormik({
    initialValues: {
      uuid: bookInfo.uuid,
      title: bookInfo.title || "",
      description: bookInfo.description || "",
      imageURL: bookInfo.imageURL || "",
      tags: bookInfo.tags ? bookInfo.tags.map((tag) => tagList[tag].name) : [],
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      if (bookInfo.uuid) {
        bookManagerDispatcher({ type: actionsType.editBook, book: values });
      } else {
        bookManagerDispatcher({ type: actionsType.newBook, book: values });
      }
    },
  });
  const handleAddChip = (chip) => {
    handleChange({
      target: {
        name: "tags",
        value: [...values.tags, chip.toLowerCase().trim()],
      },
    });
  };
  const handleDeleteChip = (event, index) => {
    handleChange({
      target: {
        name: "tags",
        value: [
          ...values.tags.filter((value, thisIndex) => index !== thisIndex),
        ],
      },
    });
  };
  const handleSubmitAndReset = async (event) => {
    event.preventDefault();
    await submitForm();
    handleReset();
    handleClose();
  };
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Grid
        container
        className={classes.paper}
        alignItems={"flex-end"}
        component={"form"}
        onSubmit={handleSubmitAndReset}
      >
        <Grid item xs={12}>
          Book Form
        </Grid>

        <Grid item xs={6}>
          <TextField
            value={values.title}
            onChange={handleChange}
            id="title"
            name="title"
            label="Title"
          />
        </Grid>
        <Grid item xs={6}>
          <ChipInput
            label="tags"
            value={values.tags}
            onAdd={handleAddChip}
            onDelete={handleDeleteChip}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={values.description}
            onChange={handleChange}
            id="description"
            name="description"
            label="Description"
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={values.imageURL}
            onChange={handleChange}
            id="imageURL"
            name="imageURL"
            label="ImageURL"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type={"submit"} variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalBookForm;
