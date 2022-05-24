import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ArticleList from "../pages/ArticleList";

const MockArticleList = () => {
  return (
    <BrowserRouter>
      <ArticleList />
    </BrowserRouter>
  );
};

describe("Main Element", () => {
  it("Renders the main element correctly", () => {
    render(<MockArticleList />);
    const mainElement = screen.getByTestId("articleListMainElement");

    expect(mainElement).toBeInTheDocument();
  });
});
