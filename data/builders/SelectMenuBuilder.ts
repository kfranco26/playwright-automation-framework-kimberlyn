import { getRandomItem, getRandomSubset } from '../../utils/randomHelpers';

// Define Select Menu scenario data shape
export type SelectMenuScenario = {
  name: string;
  selectValue: string;
  selectOne: string;
  oldStyleColor: string;
  colors: string[];
  cars: string[];
};

// Define available select values
const selectValues = [
  'Group 1, option 1',
  'Group 1, option 2',
  'Group 2, option 1',
  'Group 2, option 2',
  'A root option',
  'Another root option',
] as const;

// Define available title options
const selectOneOptions = [
  'Dr.',
  'Mr.',
  'Mrs.',
  'Ms.',
  'Prof.',
  'Other',
] as const;

// Define available old style colors
const oldStyleColors = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Purple',
  'Black',
  'White',
  'Voilet',
  'Indigo',
  'Magenta',
  'Aqua',
] as const;

// Define available multi-select colors
const colors = ['Green', 'Blue', 'Black', 'Red'] as const;

// Define available car options
const cars = ['volvo', 'saab', 'opel', 'audi'] as const;

// Build dynamic Select Menu test data
export class SelectMenuBuilder {
  private scenario: SelectMenuScenario = {
    // Initialize default randomized values
    name: 'default',
    selectValue: getRandomItem(selectValues),
    selectOne: getRandomItem(selectOneOptions),
    oldStyleColor: getRandomItem(oldStyleColors),
    colors: getRandomSubset(colors, 2),
    cars: getRandomSubset(cars, 2),
  };

  // Set scenario name
  withName(name: string): this {
    this.scenario.name = name;
    return this;
  }

  // Set value from Group 1 options
  withGroupOne(): this {
    this.scenario.selectValue = getRandomItem([
      'Group 1, option 1',
      'Group 1, option 2',
    ]);
    return this;
  }

  // Set value from Group 2 options
  withGroupTwo(): this {
    this.scenario.selectValue = getRandomItem([
      'Group 2, option 1',
      'Group 2, option 2',
    ]);
    return this;
  }

  // Set single car selection
  withSingleCar(): this {
    this.scenario.cars = [getRandomItem(cars)];
    return this;
  }

  // Set multiple car selections
  withMultipleCars(): this {
    this.scenario.cars = getRandomSubset(cars, 2);
    return this;
  }

  // Return final scenario data
  build(): SelectMenuScenario {
    return {
      ...this.scenario,
      colors: [...this.scenario.colors],
      cars: [...this.scenario.cars],
    };
  }
}