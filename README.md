# playwright-automation-framework-kimberlyn
Playwright + TypeScript automation framework using POM, data-driven testing, and builder pattern for DemoQA application.

## 📌 Objective

Demonstrate the ability to automate web interactions using **Playwright + TypeScript** based on the DemoQA application:

👉 https://demoqa.com/

---

## 🎯 Scope

The following functionalities are automated:

### ✔ Web Tables
- Add user record
- Edit existing record
- Delete record
- Validate changes are saved

### ✔ Forms (Student Form)
- Fill and submit form
- Use multiple data sets (data-driven)
- Validate successful submission

### ✔ Widgets (Select Menu)
- Select values from:
  - React Select dropdown
  - Standard select dropdown
  - Multi-select dropdown
- Validate selected values

---

## 🧠 Approach

This framework is built using:

- **Page Object Model (POM)** — separates UI interactions from test logic  
- **Data-Driven Testing** — scenarios defined independently from tests  
- **Builder Pattern** — dynamic and reusable test data generation  
- **Custom Fixtures** — reusable page setup for cleaner tests  

---

## 📁 Project Structure
- `pages/` → Page Object Models  
- `tests/` → Test Specs  
- `data/` → Test Data & Builders  
- `utils/` → Helper Functions  
- `fixtures/` → Custom Playwright Fixtures  

---

## 🛠 Tech Stack

- Playwright
- TypeScript
- Node.js
- Faker (for test data generation)

---

## ▶️ Run Tests

Run all tests:

```bash
npx playwright test
```

Run in headed mode:

```bash
npx playwright test --headed
```

Run a specific test:

```bash
npx playwright test tests/forms/studentForm.spec.ts
```

---

## 📊 Reporting

View Playwright HTML report:

```bash
npx playwright show-report
```

---

## 🔥 Allure Reporting (Optional)

Install dependencies:

```bash
npm install -D allure-playwright allure-commandline
```

Update `playwright.config.ts`:

```ts
reporter: [['html'], ['allure-playwright']]
```

Generate and open report:

```bash
npx playwright test
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

----

## ✅ Best Practices Applied

- Stable locators (`getByRole`, avoiding dynamic CSS)
- Strict mode compatibility
- Clean separation of concerns (POM)
- Reusable and scalable test design
- Minimal, intent-focused comments
- Data-driven test coverage

---

## 📋 Evaluation Criteria Coverage

✔ Correct automation of required features  
✔ Playwright best practices applied  
✔ Clean, readable, maintainable code  
✔ Comments explaining intent where needed  

---

## 📦 Submission

Project can be run using:

```bash
npx playwright test
```

---
## 👤 Author

**Kimberlyn Franco**  
QA Automation Engineer

----

👤 Author

Kimberlyn Franco
QA Automation Engineer
