import { faker } from '@faker-js/faker';
import { WebTableUser } from '../webTablesTestData';

// Build dynamic user data for Web Table tests
export class WebTableUserBuilder {
  private user: WebTableUser = {
    // Initialize default randomized values
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    age: faker.number.int({ min: 18, max: 60 }).toString(),
    salary: faker.number.int({ min: 30000, max: 150000 }).toString(),
    department: faker.commerce.department(),
  };

  // Set department value
  withDepartment(department: string): this {
    this.user.department = department;
    return this;
  }

  // Return final user data
  build(): WebTableUser {
    return { ...this.user };
  }
}