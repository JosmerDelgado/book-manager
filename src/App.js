import React from "react";
import Main from "./components/Main";
import { BookManagerProvider } from "./context/bookManager";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import Header from "./components/Header";
import { ModalProvider } from "./context/bookModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BookManagerProvider>
        <ModalProvider>
          <Header />
          <Main />
        </ModalProvider>
      </BookManagerProvider>
    </div>
  );
}

export default App;
