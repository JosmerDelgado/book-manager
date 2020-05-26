import React, { useState, useCallback } from "react";
import { Button } from "@material-ui/core";
import ModalBookForm from "./ModalBookForm";
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
