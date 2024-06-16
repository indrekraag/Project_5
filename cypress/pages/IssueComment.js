class IssueComment {
  getIssueModal() {
    return cy.get(this.issueModal);
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailModal);

  
  }
  addNewComment() {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(comment);
      cy.contains("button", "Save").click();
    )};

export default new IssueComment();
