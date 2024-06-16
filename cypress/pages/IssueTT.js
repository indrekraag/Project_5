class IssueTT {
  constructor() {
    this.createIssueBtn = '[data-testid="icon:plus"]';
    this.issueDescription = ".ql-editor";
    this.getIssueTitleField = 'input[name="title"]';
    this.issueModal = '[data-testid="modal:issue-create"]';
    this.assignee = '[data-testid="select:userIds"]';
    this.issueType = '[data-testid="select:type"]';
    this.descriptionField = ".ql-editor";
    this.title = 'input[name="title"]';
    this.submitButton = 'button[type="submit"]';
    this.issueCreated = "Issue has been successfully created.";
    this.backlogList = '[data-testid="board-list:backlog"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.icon = '[data-testid="icon:bug"]';
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.noTimeLogged = "No time logged";
    this.inputNumber = 'input[placeholder="Number"]';
    this.closeDetailModalBtn = '[data-testid="icon:close"]';
    this.stopWatch = '[data-testid="icon:stopwatch"]';
    this.trackingModal = '[data-testid="modal:tracking"]';
    this.timeSpentHours = 'input[placeholder="Number"]';
    this.timeRemainingHours = "Time remaining (hours)";
    this.doneButton = "Done";
  }

  getIssueModal() {
    return cy.get(this.issueModal);
  }

  selectIssueType() {
    cy.get(this.issueType).click("bottomRight");
    cy.get('[data-testid="select-option:Bug"]')
      .trigger("mouseover")
      .trigger("click");
  }

  editTitle(title) {
    cy.get(this.title).clear().type(title);
  }

  editDescription(description) {
    cy.get(this.descriptionField).clear().type(description);
  }

  selectAssignee() {
    cy.get(this.assignee).click("bottomRight");
    cy.get('[data-testid="select-option:Pickle Rick"]').click();
  }

  createIssue(issueDetails) {
    cy.get(this.createIssueBtn);
    this.getIssueModal().within(() => {
      this.selectIssueType();
      this.editDescription(issueDetails.description);
      this.editTitle(issueDetails.title);
      this.selectAssignee();
      cy.get(this.submitButton).click();
    });
  }

  assertIssueCreated(issueDetails, _expectedAmountOfIssues) {
    cy.get(this.issueModal).should("not.exist");
    cy.reload();
    cy.contains(this.issueCreated).should("not.exist");
    cy.get(this.backlogList)
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get(this.issuesList)
          .should("have.length", _expectedAmountOfIssues)
          .first()
          .find("p")
          .contains(issueDetails.title);
      });
  }

  addTime(estimate, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(this.noTimeLogged).should("exist");
      cy.get(this.inputNumber).clear().type(estimate).wait(1000);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }

  assertAddTimeWorked(estimate, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).should("have.value", estimate);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  addNewTime(estimate2, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).clear().type(estimate2).wait(1000);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  assertAddNewTimeWorked(estimate2, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).should("have.value", estimate2);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  removeNewTime(estimate2, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).clear().wait(1000);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  assertRemoveNewTimeWorked(title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).should("have.value", "");
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  addTimeSpent(timeSpent, timeRemaining, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(this.noTimeLogged).should("exist").click().wait(6000);
      //cy.get(this.stopWatch).click();
      //cy.get(this.noTimeLogged).click();
      cy.get(this.trackingModal)
        .should("be.visible")
        .within(() => {
          //cy.get(this.trackingModal).should("be.visible");
          //cy.get(this.trackingModal).within(() => {
          cy.contains(this.timeSpentHours)
            .first()
            .clear()
            .type(timeSpent)
            .wait(1000);
          //cy.get(this.inputNumber).first().clear().type(timeSpent).wait(1000);
          cy.contains(this.timeRemainingHours);
          cy.get(this.inputNumber)
            .last()
            .clear()
            .type(timeRemaining)
            .wait(1000);
          cy.get(this.doneButton).click();
        });
    });
  }
}

export default new IssueTT();
