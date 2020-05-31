import { bookReducer, actionsType } from "../bookManager";

describe("bookManager Tests", () => {
  describe("action newBook", () => {
    const state = { books: [], tags: [], bookList: {} };
    it("test book reducer when action is Add newBook w/o tags", () => {
      const result = bookReducer(state, {
        type: actionsType.newBook,
        book: {
          title: "Test1",
          description: "Description test1",
          imageURL: "test image",
          tags: [],
        },
      });
      expect(result.books).toHaveLength(1);
      expect(result.books[0].title).toBe("Test1");
      expect(result.books[0].description).toBe("Description test1");
      expect(result.books[0].imageURL).toBe("test image");
    });

    it("test book reducer when action is Add newBook with tags", () => {
      const result = bookReducer(state, {
        type: actionsType.newBook,
        book: {
          title: "Test1",
          description: "Description test1",
          imageURL: "test image",
          tags: ["onetag", "anothertag"],
        },
      });
      expect(result.books[0].tags[0]).toBe(0);
      expect(result.books[0].tags[1]).toBe(1);
      expect(result.tags[0].name).toBe("onetag");
      expect(result.tags[0].count).toBe(1);
      expect(result.tags[1].name).toBe("anothertag");
      expect(result.tags[1].count).toBe(1);
    });
    it("test book reducer when action is Add newBook with tags preexisted", () => {
      state.books = [
        {
          title: "Test0",
          description: "Description test0",
          imageURL: "test image",
          uuid: "asd123",
          tags: [0, 1],
        },
      ];
      state.tags = [
        { count: 1, name: "1tag" },
        { count: 1, name: "2tag" },
      ];
      const result = bookReducer(state, {
        type: actionsType.newBook,
        book: {
          title: "Test1",
          description: "Description test1",
          imageURL: "test image",
          tags: ["1tag", "anothertag"],
        },
      });
      expect(result.books[0].tags[0]).toBe(0);
      expect(result.books[0].tags[1]).toBe(2);
      expect(result.tags[0].name).toBe("1tag");
      expect(result.tags[0].count).toBe(2);
      expect(result.tags[2].name).toBe("anothertag");
      expect(result.tags[2].count).toBe(1);
    });
  });
  describe("action editBook", () => {
    const state = {
      books: [
        {
          title: "Test0",
          description: "Description test0",
          imageURL: "test image",
          uuid: "asd123",
          tags: [0, 1],
        },
      ],
      tags: [
        { count: 1, name: "1tag" },
        { count: 1, name: "2tag" },
      ],
      bookList: {},
    };
    it("edit fields w/o edit tags", () => {
      const result = bookReducer(state, {
        type: actionsType.editBook,
        book: {
          title: "Test1",
          description: "Description test1",
          imageURL: "test image1",
          uuid: "asd123",
          tags: ["1tag", "2tag"],
        },
      });
      expect(result.books[0].title).toBe("Test1");
      expect(result.books[0].description).toBe("Description test1");
      expect(result.books[0].imageURL).toBe("test image1");
      expect(result.books[0].tags).toStrictEqual([0, 1]);
    });
    it("edit fields with tags edition", () => {
      const result = bookReducer(state, {
        type: actionsType.editBook,
        book: {
          title: "Test1",
          description: "Description test1",
          imageURL: "test image1",
          uuid: "asd123",
          tags: ["1tag", "3tag"],
        },
      });
      expect(result.books[0].title).toBe("Test1");
      expect(result.books[0].description).toBe("Description test1");
      expect(result.books[0].imageURL).toBe("test image1");
      expect(result.books[0].tags).toStrictEqual([0, 2]);
      expect(result.tags[1].count).toBe(0);
    });
    it("edit fields with tags edition empty tags", () => {
      const result = bookReducer(state, {
        type: actionsType.editBook,
        book: {
          title: "Test1",
          description: "Description test1",
          imageURL: "test image1",
          uuid: "asd123",
          tags: [],
        },
      });
      expect(result.books[0].title).toBe("Test1");
      expect(result.books[0].description).toBe("Description test1");
      expect(result.books[0].imageURL).toBe("test image1");
      expect(result.books[0].tags).toStrictEqual([]);
      expect(result.tags[0].count).toBe(0);
    });
  });
  describe("action deleteBook", () => {
    const state = {
      books: [
        {
          title: "Test0",
          description: "Description test0",
          imageURL: "test image",
          uuid: "asd123",
          tags: [0, 1],
        },
      ],
      tags: [
        { count: 1, name: "1tag" },
        { count: 1, name: "2tag" },
      ],
      bookList: { myList: ["asd123"] },
    };
    it("delete book and delete book from list", () => {
      const result = bookReducer(state, {
        type: actionsType.deleteBook,
        book: {
          title: "Test0",
          description: "Description test0",
          imageURL: "test image",
          uuid: "asd123",
          tags: [0, 1],
        },
      });
      expect(result.books).toHaveLength(0);
      expect(result.bookList.myList).toBeUndefined();
    });
  });
  describe("action addList", () => {
    const state = {
      books: [
        {
          title: "Test0",
          description: "Description test0",
          imageURL: "test image",
          uuid: "asd123",
          tags: [0, 1],
        },
      ],
      tags: [
        { count: 1, name: "1tag" },
        { count: 1, name: "2tag" },
      ],
      bookList: {},
    };
    it("add new book to list", () => {
      const result = bookReducer(state, {
        type: actionsType.newList,
        listOfBooks: {
          myList: [
            {
              title: "Test0",
              description: "Description test0",
              imageURL: "test image",
              uuid: "asd123",
              tags: [0, 1],
            },
          ],
        },
      });
      expect(result.bookList).toStrictEqual({ myList: ["asd123"] });
    });
  });
  describe("action deleteList", () => {
    const state = {
      books: [
        {
          title: "Test0",
          description: "Description test0",
          imageURL: "test image",
          uuid: "asd123",
          tags: [0, 1],
        },
      ],
      tags: [
        { count: 1, name: "1tag" },
        { count: 1, name: "2tag" },
      ],
      bookList: { myList: ["asd123"] },
    };
    it("delete book from list", () => {
      const result = bookReducer(state, {
        type: actionsType.deleteList,
        listName: "myList",
      });
      expect(result.bookList.myList).toBeUndefined();
    });
  });
});
