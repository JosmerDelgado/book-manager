// @flow
import { type book } from "./bookType";

export type bookList = { name: string, books: [book] };

export const listCreator = (name: string, books: [book]): bookList => ({
  name,
  books,
});
