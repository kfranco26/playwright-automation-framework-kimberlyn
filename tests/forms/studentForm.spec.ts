import { expect } from '@playwright/test';
import { test } from '../../data/fixtures/pages.fixture';
import { studentFormScenarios } from '../../data/studentFormTestData';
import { StudentFormUserBuilder } from '../../data/builders/StudentFormUserBuilder';

// Test suite for Student Form submission
test.describe('Student Form', () => {

  // Data-driven execution using multiple scenarios
  for (const scenario of studentFormScenarios) {
    test(`submits form > ${scenario.name}`, async ({ studentFormPage }) => {

      // Build test data dynamically using builder pattern
      const user = new StudentFormUserBuilder()
        .withGender(scenario.gender)
        .withSubjects(scenario.subjects)
        .withHobbies(scenario.hobbies)
        .build();

      // Perform form actions
      await studentFormPage.fillForm(user);
      await studentFormPage.submit();

      // Assertion: verify successful submission modal is displayed
      await expect(studentFormPage.successModalTitle).toBeVisible();
    });
  }
});