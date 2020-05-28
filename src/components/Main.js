import React from "react";
import { useBookManagerState } from "../context/bookManager";
import BookFilteredTable from "./BookFilteredTable";

const Main = () => {
  const bookManagerState = useBookManagerState();

  return (
    <>
      <BookFilteredTable rows={bookManagerState.books} />
    </>
  );
};

export default Main;
