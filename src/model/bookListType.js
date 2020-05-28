// @flow
import { type book } from "./bookType";

export type bookList = { [string]: [number] };

export const listCreator = (name: string, books: [book]): bookList => ({
  [name]: books,
});
