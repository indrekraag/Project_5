//import IssueComment from "../pages/IssueComment";

describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  const comment = "Test Comment;";

  it("Should create a new comment", () => {
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(comment);
      cy.contains("Save").click().should("not.exist");
      cy.contains(comment).should("exist");
    });
  });
  const editedComment = "Edited old silent pont";

  it("Should edit a comment", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .within(() => {
          cy.contains("Edit").click();
          cy.get('textarea[placeholder="Add a comment..."]')
            .clear()
            .type(editedComment);
          cy.contains("Save").click().should("not.exist");
          cy.contains(editedComment).should("exist");
        });
    });
  });
  it.only("Should delete a comment", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .within(() => {
          cy.contains("Delete").click();
        });
      cy.wait(6000);
      /*cy.get('[data-testid="modal:confirm"]').within(() => {*/
      cy.contains("button", "Delete comment").click();
    });
  });
});
//});
