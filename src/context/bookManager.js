import React from "react";
const actions = {
  newBook: "newBook",
  editBook: "editBook",
  deleteBook: "deleteBook",
  newList: "newList",
  deleteList: "deleteList",
};

const BookStateContext = React.createContext();
const BookDispatchContext = React.createContext();
function bookReducer(state, action) {
  switch (action.type) {
    case actions.newBook: {
      return { count: state.books + 1 };
    }
    case "editBook": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
const init = (initialValues) => {
  // call to local storage here
  return initialValues; // or localStorage Values
};

function BookManagerProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    bookReducer,
    { books: [], tags: [], bookList },
    init
  );
  return (
    <BookStateContext.Provider value={state}>
      <BookDispatchContext.Provider value={dispatch}>
        {children}
      </BookDispatchContext.Provider>
    </BookStateContext.Provider>
  );
}
function useBookManagerState() {
  const context = React.useContext(BookStateContext);
  if (context === undefined) {
    throw new Error(
      "useBookManagerState must be used within a BookManagerProvider"
    );
  }
  return context;
}
function useBookManagerDispatch() {
  const context = React.useContext(BookDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useBookManagerDispatch must be used within a BookManagerProvider"
    );
  }
  return context;
}
export { BookManagerProvider, useBookManagerState, useBookManagerDispatch };
