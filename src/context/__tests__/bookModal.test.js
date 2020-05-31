import { modalReducer, modalActionTypes } from "../bookModal";

describe("bookModal", () => {
  it("on Open New Book Modal", () => {
    const result = modalReducer({}, { type: modalActionTypes.openNewBook });
    expect(result.isOpen).toBe(true);
    expect(result.bookInfo).toStrictEqual({});
  });
  it("on Open edit Book Modal", () => {
    const result = modalReducer(
      {},
      {
        type: modalActionTypes.openEditBook,
        book: {
          title: "Title2",
          description: "Description2",
          imageURL: "https://picsum.photos/200/300",
          tags: [],
          uuid: "asd123",
        },
      }
    );
    expect(result.isOpen).toBe(true);
    expect(result.bookInfo).toStrictEqual({
      title: "Title2",
      description: "Description2",
      imageURL: "https://picsum.photos/200/300",
      tags: [],
      uuid: "asd123",
    });
  });
  it("on close", () => {
    const result = modalReducer({}, { type: modalActionTypes.close });
    expect(result.isOpen).toBe(false);
    expect(result.bookInfo).toBe(null);
  });
});
