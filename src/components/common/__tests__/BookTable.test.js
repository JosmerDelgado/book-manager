import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BookTable from "../BookTable";
import { bookCreator } from "../../../model/bookType";
import { BookManagerProvider } from "../../../context/bookManager";

describe("BookTable", () => {
  it("Amount of rows by Book w/o actions", async () => {
    const { findAllByTestId, queryByTestId } = render(
      <BookTable
        rows={[bookCreator("asd123", "title1", "description1", [], "image")]}
      />,
      { wrapper: BookManagerProvider }
    );
    const bookRows = await findAllByTestId("book-row");
    const actionRows = await queryByTestId("action-row");
    expect(bookRows).toHaveLength(1);
    expect(actionRows).toBeNull();
  });
  it("Amount of rows by Book with actions", async () => {
    const action = jest.fn();
    const { findAllByTestId, findByTestId } = render(
      <BookTable
        rows={[bookCreator("asd123", "title1", "description1", [], "image")]}
        actions={[{ text: "Action1", colorType: "primary", action: action }]}
      />,
      { wrapper: BookManagerProvider }
    );
    const bookRows = await findAllByTestId("book-row");
    const actionRows = await findAllByTestId("action-row");
    const actionButton = await findByTestId("action-row-Action1");
    expect(bookRows).toHaveLength(1);
    expect(actionRows).toHaveLength(1);
    fireEvent.click(actionButton);
    expect(action).toHaveBeenCalled();
  });
});
