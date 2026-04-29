import { WebTableUserBuilder } from './builders/WebTableUserBuilder';

// Web Table data types
export type WebTableUser = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
};

export type WebTableScenario = {
  name: string;
  user: WebTableUser;
  updatedUser: WebTableUser;
};

// Data-driven Web Table scenarios
export const webTableScenarios: WebTableScenario[] = [
  {
    name: 'QA user record',

    user: new WebTableUserBuilder()
      .withDepartment('QA')
      .build(),

    updatedUser: new WebTableUserBuilder()
      .withDepartment('Automation QA')
      .build(),
  },
];