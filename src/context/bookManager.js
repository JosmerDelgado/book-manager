// @flow

import React from "react";
import { createTag } from "../model/tagType";
import uniqid from "uniqid";
import { saveLocalStorageData, getLocalStorageData } from "../storageManager";
import { type book as bookType } from "../model/bookType";
import { type tag as tagType } from "../model/tagType";

export const actionsType = {
  newBook: "newBook",
  editBook: "editBook",
  deleteBook: "deleteBook",
  newList: "newList",
  deleteList: "deleteList",
};

type parameterReducer = {
  type: $Values<actionsType>,
  book: bookType,
  listOfBooks: { [string]: [bookType] },
  listName: string,
};

type returnReducer = {
  books: [bookType],
  tags: [tagType],
  bookList: bookList,
};

const BookStateContext = React.createContext();
const BookDispatchContext = React.createContext();
export function bookReducer(
  state,
  { type, book, listOfBooks, listName }: parameterReducer
): returnReducer {
  switch (type) {
    case actionsType.newBook: {
      book.uuid = uniqid();
      if (book.tags.length > 0) {
        book.tags = book.tags.map((tag) => {
          const index = state.tags.findIndex((myTag) => {
            return myTag.name === tag;
          });
          if (index < 0) {
            state.tags.push(createTag(tag));
            return state.tags.length - 1;
          } else {
            state.tags[index] = createTag(
              state.tags[index].name,
              state.tags[index].count + 1
            );
            return index;
          }
        });
      }
      return { ...state, books: [book, ...state.books], tags: [...state.tags] };
    }
    case actionsType.editBook: {
      const elementIndex = state.books.findIndex(
        (thisBook) => thisBook.uuid === book.uuid
      );

      const prevTags = state.books[elementIndex].tags.map(
        (prevTag) => state.tags[prevTag].name
      );
      const currentTags = book.tags;
      const deletedTags = prevTags.filter(
        (thisTag) => !currentTags.includes(thisTag)
      );
      deletedTags.forEach((tagDeleted) => {
        const deletedIndex = state.tags.findIndex(
          (tag) => tag.name === tagDeleted
        );
        state.tags[deletedIndex] = createTag(
          state.tags[deletedIndex].name,
          state.tags[deletedIndex].count - 1
        );
      });
      const newTags = currentTags.filter(
        (thisTag) => !prevTags.includes(thisTag)
      );
      const newIndexTags = newTags.map((newTag) => {
        const tagIndex = state.tags.findIndex((tag) => tag.name === newTag);
        if (tagIndex < 0) {
          state.tags.push(createTag(newTag));
          return state.tags.length - 1;
        } else {
          state.tags[tagIndex] = createTag(
            newTag,
            state.tags[tagIndex].count + 1
          );
          return tagIndex;
        }
      });
      const tagsKeeped = currentTags.filter((thisTag) =>
        prevTags.includes(thisTag)
      );
      const keepedIndexTags = tagsKeeped.map((keepedTag) =>
        state.tags.findIndex((tag) => tag.name === keepedTag)
      );
      book.tags = [...keepedIndexTags, ...newIndexTags];

      state.books.splice(elementIndex, 1, book);
      return { ...state, books: [...state.books], tags: [...state.tags] };
    }
    case actionsType.deleteBook: {
      if (book.tags.length > 0) {
        book.tags.forEach((tagIndex) => {
          state.tags[tagIndex] = createTag(
            state.tags[tagIndex].name,
            state.tags[tagIndex].count - 1
          );
        });
      }
      const bookList = Object.keys(state.bookList).reduce((acc, curr) => {
        const filteredIds = state.bookList[curr].filter(
          (uuid) => uuid !== book.uuid
        );

        return filteredIds.length > 0
          ? {
              ...acc,
              [curr]: filteredIds,
            }
          : { ...acc };
      }, {});
      return {
        ...state,
        books: [...state.books.filter((data) => data.uuid !== book.uuid)],
        tags: [...state.tags],
        bookList,
      };
    }
    case actionsType.newList: {
      const [[key, bookList]] = Object.entries(listOfBooks);
      const bookWithId = { [key]: bookList.map((myBook) => myBook.uuid) };
      return { ...state, bookList: { ...state.bookList, ...bookWithId } };
    }
    case actionsType.deleteList: {
      delete state.bookList[listName];
      return { ...state };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
const init = (initialValues) => {
  const prevData = getLocalStorageData();
  return prevData || initialValues;
};

const bookReducerAndSave = (state, action) => {
  const result = bookReducer(state, action);
  saveLocalStorageData(result);
  return result;
};

function BookManagerProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    bookReducerAndSave,
    {
      books: [],
      tags: [],
      bookList: {},
    },
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
