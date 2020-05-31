import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import ModalBookForm from "../modals/ModalBookForm";
import {
  useModalState,
  useModalDispatch,
  modalActionTypes,
} from "../../context/bookModal";
import { useBookManagerState } from "../../context/bookManager";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const { isOpen, bookInfo } = useModalState();
  const modalDipatch = useModalDispatch();
  const { tags } = useBookManagerState();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Book Manager
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            All Books
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("lists");
            }}
          >
            Books by list
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              modalDipatch({ type: modalActionTypes.openNewBook });
            }}
          >
            New Book
          </Button>
        </Toolbar>
      </AppBar>
      {isOpen && (
        <ModalBookForm
          openModal={isOpen}
          bookInfo={bookInfo}
          tagList={tags}
          handleClose={() => modalDipatch({ type: modalActionTypes.close })}
        />
      )}
    </div>
  );
};

export default Header;
