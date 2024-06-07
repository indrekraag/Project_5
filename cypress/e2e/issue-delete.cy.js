describe("Issue deletion", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.get('[data-testid="board-list:backlog"]').should("be.visible");
        cy.get('[data-testid="list-issue"]').first().click();
        cy.get('[data-testid="modal:issue-details"]').should("be.visible");
      });
  });
  it("Test Case 1: Issue Deletion", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').contains("Delete issue").click();
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="list-issue"]')
      .first()
      .should("not.contain", "This is an issue of type: Task.");
  });

  it("Test Case 2: Issue Deletion Cancellation", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    cy.get('[data-testid="modal:confirm"]').contains("Cancel").click();
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get(".sc-bdVaJa.fuyACr").click();
    cy.get('[data-testid="list-issue"]')
      .first()
      .should("contain", "This is an issue of type: Task.");
  });
});
