describe("Renders the my articles page", () => {
  beforeEach(() => {
    // Login first
    cy.visit("/login");
    cy.get("#username").clear();
    cy.get("#password").clear();
    cy.get("#username").type("elon");
    cy.get("#password").type("musk");
    cy.get("form button").click();
  });

  it("Renders the nav correctly", () => {
    cy.get("nav");
  });

  it("Renders the table correctly", () => {
    cy.get("table");
  });
});

describe("Redirects", () => {
  it("Redirects to new article after clicking on the create new article button", () => {
    // Login first
    cy.visit("/login");
    cy.get("#username").clear();
    cy.get("#password").clear();
    cy.get("#username").type("elon");
    cy.get("#password").type("musk");
    cy.get("form button").click();

    cy.get("#createNewArticleFromMyArticles").click();
    cy.location("pathname").should("eq", "/newarticle");
  });

  it("Redirects to edit article after clicking on the edit article button", () => {
    // Login first
    cy.visit("/login");
    cy.get("#username").clear();
    cy.get("#password").clear();
    cy.get("#username").type("elon");
    cy.get("#password").type("musk");
    cy.get("form button").click();

    cy.get("#edit_article_btn").click();
    cy.location("pathname").should("contain", "/editarticle");
  });
});

describe("The route is protected", () => {
  it("Redirects to main page if user wants to visit the my articles page without being logged in.", () => {
    cy.visit("/myarticles");
    cy.location("pathname").should("eq", "/");
  });
});
