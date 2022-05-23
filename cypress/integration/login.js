describe("Renders the login page", () => {
  it("Renders the nav correctly", () => {
    cy.visit("/login");
    cy.get("nav");
  });

  it("Renders the form correctly", () => {
    cy.visit("/login");
    cy.get(".Login_login_form__l1H-w");
  });

  it("Renders the name input correctly", () => {
    cy.visit("/login");
    cy.get("#username");
  });

  it("Renders the password input correctly", () => {
    cy.visit("/login");
    cy.get("#password");
  });

  it("Renders the button correctly", () => {
    cy.visit("/login");
    cy.get("form button");
  });
});

describe("Shows the error message", () => {
  it("Shows the error when login credentials are not correct", () => {
    cy.visit("/login");
    cy.get("#username").type("elon");
    cy.get("#password").type("muskk");
    cy.get("form button").click();
    cy.get("#error_paragraph");
  });
});

describe("Redirects", () => {
  it("Redirects to my articles page if logged in successfully", () => {
    cy.visit("/login");
    cy.get("#username").type("elon");
    cy.get("#password").type("musk");
    cy.get("form button").click();
    cy.location("pathname").should("eq", "/myarticles");
  });
});
