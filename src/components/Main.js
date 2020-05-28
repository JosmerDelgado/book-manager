import React from "react";
import { useBookManagerState } from "../context/bookManager";
import BookTable from "./BookTable";

const Main = () => {
  const bookManagerState = useBookManagerState();

  return (
    <>
      <BookTable
        rows={bookManagerState.books}
        tagList={bookManagerState.tags}
      />
    </>
  );
};

export default Main;
