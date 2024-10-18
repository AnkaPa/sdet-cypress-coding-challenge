// cypress/pageObjects/HomePage.ts

class HomePage {
  get dateRange() {
    return cy.get('.DateRangeSelect');
  }

  get startDateInput() {
    return cy.get('#mui-4');
  }

  get endDateInput() {
    return cy.get('#mui-5');
  }

  get startDateLabel() {
    return cy.get('#mui-4-label');
  }

  get endDateLabel() {
    return cy.get('#mui-5-label');
  }

  get calendarPopUp() {
    return cy.get('[role="tooltip"]');
  }

  get previousMonthButton() {
    return cy.get('[aria-label="Previous month"]').first();
  }

  get nextMonthButton() {
    return cy.get('[aria-label="Next month"]').eq(1);
  }

  get startMonthYearTitle() {
    return cy.get('[class*="MuiTypography-subtitle1"]').first();
  }

  get endMonthYearTitle() {
    return cy.get('[class*="MuiTypography-subtitle1"]').eq(1);
  }

  get todayDateButton() {
    return cy.get('[class*="MuiPickersDay-today"]');
  }

  get focusedInput() {
    return cy.get('[class*="MuiInputBase-colorPrimary Mui-focused "]');
  }

  get selectedStartDateButton() {
    return cy.get('[class*="Mui-selected"]').first();
  }

  get selectedEndDateButton() {
    return cy.get('[class*="Mui-selected"]').eq(1);
  }

  selectDateFromCalendar(date: string) {
    cy.get(`[aria-label="${date}"]`).should('exist').click();
  }
}

export default new HomePage();
