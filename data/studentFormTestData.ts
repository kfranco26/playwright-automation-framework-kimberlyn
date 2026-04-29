import { State, City } from '../utils/stateCityHelper';

// Supported form values
export type Gender = 'Male' | 'Female' | 'Other';
export type Hobby = 'Sports' | 'Reading' | 'Music';

// Data-driven Student Form scenario
export type StudentFormScenario = {
  name: string;        // test case description
  gender: Gender;      // radio selection
  subjects: string[];  // multiple subjects (autocomplete)
  hobbies: Hobby[];    // checkbox selections
  state: State;        // state dropdown value
  city: City;          // dependent city dropdown
};

// Student Form happy-path scenarios
export const studentFormScenarios: StudentFormScenario[] = [
  {
    name: 'male student with multiple subjects and hobbies',
    gender: 'Male',
    subjects: ['Accounting', 'Physics'],
    hobbies: ['Sports', 'Music', 'Reading'],
    state: 'NCR',
    city: 'Delhi',
  },
  {
    name: 'female student with arts subjects',
    gender: 'Female',
    subjects: ['Maths', 'English'],
    hobbies: ['Reading', 'Music'],
    state: 'Uttar Pradesh',
    city: 'Agra',
  },
  {
    name: 'other gender with computer science subject',
    gender: 'Other',
    subjects: ['Computer Science'],
    hobbies: ['Sports'],
    state: 'Haryana',
    city: 'Karnal',
  },
];