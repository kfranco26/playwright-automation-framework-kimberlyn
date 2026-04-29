import { SelectMenuBuilder } from './builders/SelectMenuBuilder';

// Define data-driven scenarios for Select Menu tests
export const selectMenuScenarios = [
  new SelectMenuBuilder()
    // Set scenario name
    .withName('group 1 + multiple cars')

    // Set value from Group 1
    .withGroupOne()

    // Set multiple car values
    .withMultipleCars()
    .build(),

  new SelectMenuBuilder()
    // Set scenario name
    .withName('group 2 + single car')

    // Set value from Group 2
    .withGroupTwo()

    // Set single car value
    .withSingleCar()
    .build(),
];