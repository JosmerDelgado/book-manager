import React from "react";

export const modalActionTypes = {
  openNewBook: "openNewBook",
  openEditBook: "openEditBook",
  close: "close",
};

const ModalStateContext = React.createContext();
const ModalDispatchContext = React.createContext();
function modalReducer(state, { type, book }) {
  switch (type) {
    case modalActionTypes.openNewBook: {
      return { isOpen: true, bookInfo: {} };
    }
    case modalActionTypes.openEditBook: {
      return { isOpen: true, bookInfo: book };
    }
    case modalActionTypes.close: {
      return { isOpen: false, bookInfo: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function ModalProvider({ children }) {
  const [state, dispatch] = React.useReducer(modalReducer, {
    isOpen: false,
    bookInfo: null,
  });
  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error("useModalState must be used within a ModalProvider");
  }
  return context;
}
function useModalDispatch() {
  const context = React.useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error("useModalDispatch must be used within a ModalProvider");
  }
  return context;
}
export { ModalProvider, useModalState, useModalDispatch };
