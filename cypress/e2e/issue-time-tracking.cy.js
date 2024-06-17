// cypress/integration/issue_time_tracking_spec.js

import IssueTT from "../pages/IssueTT";
import { faker } from "@faker-js/faker";

describe("Issue time tracking", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  const issueDetails = {
    title: "Time tracking",
    description: faker.lorem.words(3),
  };
  const expectedAmountOfIssues = "5";
  const estimate = "10";
  const estimate2 = "12";
  const timeSpent = "8";
  const timeRemaining = "2";

  it("Should create issue and check time estimation functionality (Add, edit, assert, remove", () => {
    IssueTT.createIssue(issueDetails);
    IssueTT.assertIssueCreated(issueDetails, expectedAmountOfIssues);
    IssueTT.addTime(estimate, issueDetails.title);
    IssueTT.assertAddTimeWorked(estimate, issueDetails.title);
    IssueTT.addNewTime(estimate2, issueDetails.title);
    IssueTT.assertAddNewTimeWorked(estimate2, issueDetails.title);
    IssueTT.removeNewTime(issueDetails.title);
    IssueTT.assertRemoveNewTimeWorked(issueDetails.title);
    IssueTT.addTimeSpent(timeSpent, timeRemaining, issueDetails.title);
    IssueTT.assertTimeSpent(timeSpent, timeRemaining, issueDetails.title);
    IssueTT.removeTimeSpent(timeSpent, timeRemaining, issueDetails.title);
    IssueTT.assertRemoveTimeSpentWorked(
      timeSpent,
      timeRemaining,
      issueDetails.title
    );
  });
});
