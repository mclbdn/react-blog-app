describe("Renders the edit article page", () => {
  beforeEach(() => {
    // Login first
    cy.visit("/login");
    cy.get("#username").type("elon");
    cy.get("#password").type("musk");
    cy.get("form button").click();
    cy.visit("/editarticle/bb4a2b19-55d4-4423-b710-f747322a4ee3");
  });

  it("Renders the nav correctly", () => {
    cy.get("nav");
  });

  it("Renders the title input correctly", () => {
    cy.get("#title");
  });

  it("Renders the perex input correctly", () => {
    cy.get("#perex");
  });

  it("Renders the publish button correctly", () => {
    cy.get("#edit_article_publish_article_button");
  });

  it("Renders the md editor correctly", () => {
    cy.get(".w-md-editor");
  });
});
