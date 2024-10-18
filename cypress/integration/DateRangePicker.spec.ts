import home from '../pageObjects/HomePage';
import { format } from 'date-fns';

const today = new Date();

describe('DateRangePicker Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Assert home page is present', () => {
    home.dateRange.should('be.visible');
  });
  it('Assert there is 2 input forms with correct placeholders', () => {
    home.startDateInput.should('be.visible');
    home.endDateInput.should('be.visible');
    home.startDateLabel.should('contain.text', 'Start Date');
    home.endDateLabel.should('contain.text', 'End Date');
  });
  it('Assert start date input opens a calendar when clicked', () => {
    home.startDateInput.click();
    home.calendarPopUp.should('be.visible');
  });
  it('Assert end date input opens a calendar when clicked', () => {
    home.endDateInput.click();
    home.calendarPopUp.should('be.visible');
  });
  it('Assert previous and next moth buttons is present on calendar', () => {
    home.startDateInput.click();
    home.previousMonthButton.should('be.visible');
    home.nextMonthButton.should('be.visible');
  });
  it('Assert calendar is opened in correct month and year', () => {
    const date = today.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    home.startDateInput.click();
    home.startMonthYearTitle.should('contain.text', date);
  });
  it('Assert calendar previous month button take to correct date', () => {
    const oneMonthFromToday = new Date();
    oneMonthFromToday.setMonth(today.getMonth() - 1);

    const formattedDate = oneMonthFromToday.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    home.startDateInput.click();
    home.previousMonthButton.click();
    home.startMonthYearTitle.should('contain.text', formattedDate);
  });
  it('Assert calendar next month button take to correct date', () => {
    const oneMonthFromToday = new Date();
    oneMonthFromToday.setMonth(today.getMonth() + 1);

    const formattedDate = oneMonthFromToday.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    home.startDateInput.click();
    home.nextMonthButton.click();
    home.startMonthYearTitle.should('contain.text', formattedDate);
  });
  it('Calendar should  display correct today date', () => {
    const formattedDate = format(today, 'MM/dd/yyyy');
    home.startDateInput.click();
    home.todayDateButton.click();
    home.startDateInput.should('have.value', formattedDate);
  });
  it('Test calendar should go directly to the end day after start day is picked', () => {
    home.startDateInput.click();
    home.todayDateButton.click();
    home.focusedInput.should('have.text', 'End Date');
  });
  it('Test date can be typed', () => {
    home.startDateInput.type('12/16/2023').should('have.value', '12/16/2023');
  });
  it('Test selected day rage from calendar', () => {
    home.startDateInput.click();
    const startDate = format(new Date(2024, 9, 1), 'MMM d, yyyy'); // Oct 1, 2024
    const endDate = format(new Date(2024, 10, 30), 'MMM d, yyyy'); // Nov 30, 2024
    home.selectDateFromCalendar(startDate);
    home.selectDateFromCalendar(endDate);
    home.startDateInput.should('have.value', '10/01/2024');
    home.endDateInput.should('have.value', '11/30/2024');
  });
  it('Test wrong input', () => {
    home.startDateInput.type('asfdgacd').click();
    home.startDateInput.should('have.value', '');
    // home.startDateInput.type('45').click();
    // Wanted to check red color of the input box, but could not reproduce it, it just stop being red
    // home.startDateLabel.should('have.css', 'color', 'rgba(211, 47, 47)');
  });
});
