import { test } from '../../data/fixtures/pages.fixture';
import { studentFormScenarios } from '../../data/studentFormTestData';
import { StudentFormUserBuilder } from '../../data/builders/StudentFormUserBuilder';

// Student Form test suite
test.describe('Student Form', () => {
  for (const scenario of studentFormScenarios) {
    test(`submits form > ${scenario.name}`, async ({ studentFormPage }) => {
      const user = new StudentFormUserBuilder()
        .withGender(scenario.gender)
        .withSubjects(scenario.subjects)
        .withHobbies(scenario.hobbies)
        .build();

      await studentFormPage.fillForm(user);
      await studentFormPage.submit();
      await studentFormPage.expectSubmissionSuccess();
    });
  }
});