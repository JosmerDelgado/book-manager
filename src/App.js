import React from "react";
import Main from "./components/screens/Main";
import { BookManagerProvider } from "./context/bookManager";
import { makeStyles } from "@material-ui/core";
import Header from "./components/screens/Header";
import { ModalProvider } from "./context/bookModal";
import { Router } from "@reach/router";
import ListsContainer from "./components/screens/ListsContainer";

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
          <Router>
            <Main path="/" />
            <ListsContainer path="/lists" />
          </Router>
        </ModalProvider>
      </BookManagerProvider>
    </div>
  );
}

export default App;
