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
    this.timeSpentHours = "Time spent (hours)";
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
  //Creates a new issue
  createIssue(issueDetails) {
    //cy.get(this.createIssueBtn).click();
    this.getIssueModal().within(() => {
      this.selectIssueType();
      this.editDescription(issueDetails.description);
      this.editTitle(issueDetails.title);
      this.selectAssignee();
      cy.get(this.submitButton).click();
    });
  }
  //Checks if issue is created and visible in Backlog
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
  //Creates new time estimation to the issue
  addTime(estimate, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(this.noTimeLogged).should("exist");
      cy.get(this.inputNumber).clear().type(estimate).wait(1000);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Checks if time estimation is entered
  assertAddTimeWorked(estimate, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).should("have.value", estimate);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Edits the entered time estimaton
  addNewTime(estimate2, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).clear().type(estimate2).wait(1000);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Checks if the edited time estimation remains
  assertAddNewTimeWorked(estimate2, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).should("have.value", estimate2);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Removes the estimated time
  removeNewTime(title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).clear().wait(1000);
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Checks if time estimation was removed
  assertRemoveNewTimeWorked(title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.inputNumber).should("have.value", "");
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Inserts spent and remaining time to the issue
  addTimeSpent(timeSpent, timeRemaining, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.stopWatch).click();
    });
    cy.get(this.trackingModal)
      .should("be.visible")
      .within(() => {
        cy.get(this.inputNumber).first().clear().type(timeSpent).wait(1000);
        cy.get(this.inputNumber).last().clear().type(timeRemaining).wait(1000);
        cy.contains(this.doneButton).click();
      });
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(this.noTimeLogged).should("not.exist");
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Checks if spent and remaining time was inserted
  assertTimeSpent(timeSpent, timeRemaining, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(`${timeSpent}h logged`).should("be.visible");
      cy.contains(`${timeRemaining}h remaining`).should("be.visible");
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Removes spent and remaining time
  removeTimeSpent(timeSpent, timeRemaining, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.stopWatch).click();
    });
    cy.get(this.trackingModal)
      .should("be.visible")
      .within(() => {
        cy.get(this.inputNumber).first().clear().wait(1000);
        cy.get(this.inputNumber).last().clear().wait(1000);
        cy.contains(this.doneButton).click();
      });
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(this.noTimeLogged).should("exist");
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
  //Checks if spent and remaining time was removed
  assertRemoveTimeSpentWorked(timeSpent, timeRemaining, title) {
    cy.get(this.backlogList).contains(title).click();
    cy.get(this.issueDetailModal).within(() => {
      cy.contains(this.noTimeLogged).should("be.visible");
      cy.get(this.closeDetailModalBtn).first().click();
    });
  }
}

export default new IssueTT();
