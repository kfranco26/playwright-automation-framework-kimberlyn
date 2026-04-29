import { faker } from '@faker-js/faker';

// Define student form data shape
export type StudentFormUser = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  gender: 'Male' | 'Female' | 'Other';
  subjects: string[];
  hobbies: string[];
};

// Build dynamic user data for form tests
export class StudentFormUserBuilder {
  private readonly user: StudentFormUser;

  constructor() {
    // Initialize default randomized values
    this.user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      mobile: faker.string.numeric(10),
      address: faker.location.streetAddress(),

      // Set default selections
      gender: 'Male',
      subjects: ['Maths'],
      hobbies: ['Reading'],
    };
  }

  // Set gender value
  withGender(gender: StudentFormUser['gender']): this {
    this.user.gender = gender;
    return this;
  }

  // Set subject values
  withSubjects(subjects: string[]): this {
    this.user.subjects = subjects;
    return this;
  }

  // Set hobby values
  withHobbies(hobbies: string[]): this {
    this.user.hobbies = hobbies;
    return this;
  }

  // Override email value
  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  // Override mobile value
  withMobile(mobile: string): this {
    this.user.mobile = mobile;
    return this;
  }

  // Return final user data
  build(): StudentFormUser {
    return { ...this.user };
  }
}