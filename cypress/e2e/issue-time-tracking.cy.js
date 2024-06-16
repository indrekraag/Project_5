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

  it("Should create issue and add, change and remove time estimate", () => {
    // Add the details required for issue creation
    IssueTT.createIssue(issueDetails);
    IssueTT.assertIssueCreated(issueDetails, expectedAmountOfIssues);
    //IssueTT.addTime(estimate, issueDetails.title);
    //IssueTT.assertAddTimeWorked(estimate, issueDetails.title);
    //IssueTT.addNewTime(estimate2, issueDetails.title);
    //IssueTT.assertAddNewTimeWorked(estimate2, issueDetails.title);
    //IssueTT.removeNewTime(estimate2, issueDetails.title);
    //IssueTT.assertRemoveNewTimeWorked(issueDetails.title);
    IssueTT.addTimeSpent(timeSpent, timeRemaining, issueDetails.title);
  });
});
