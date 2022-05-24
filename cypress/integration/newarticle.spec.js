describe("Renders the new article page", () => {
  beforeEach(() => {
    // Login first
    cy.visit("/login");
    cy.get("#username").type("elon");
    cy.get("#password").type("musk");
    cy.get("form button").click();
    cy.visit("/newarticle");
  });

  it("Renders the nav correctly", () => {
    cy.get("nav");
  });

  it("Renders the title input correctly", () => {
    cy.get("#title");
  });

  it("Renders the perex input correctly", () => {
    cy.get("#perex");

    it("Renders the publish article button correctly", () => {
      cy.get("#new_article_publish_article_btn");
    });
  });

  it("Renders the upload an image button correctly", () => {
    cy.get("#new_article_image_upload_btn");
  });

  it("Renders the md editor correctly", () => {
    cy.get(".w-md-editor");
  });
});

describe("The route is protected", () => {
  it("Redirects to main page if user wants to visit the new article page without being logged in.", () => {
    cy.visit("/newarticle");
    cy.location("pathname").should("eq", "/");
  });
});
