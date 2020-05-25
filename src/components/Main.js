import React, { useState, useCallback } from "react";
import { Button } from "@material-ui/core";
import ModalBookForm from "./ModalBookForm";

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = useCallback(() => {
    setOpenModal(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);
  return (
    <>
      <Button onClick={handleOpen} color={"primary"}>
        Hola Mundo
      </Button>
      <ModalBookForm openModal={openModal} handleClose={handleClose} />
    </>
  );
};

export default Main;
