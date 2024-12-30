export default function getPreviousMonthRange(date) {
  const givenDate = new Date(date);

  const firstDayOfCurrentMonth = new Date(
    Date.UTC(givenDate.getUTCFullYear(), givenDate.getUTCMonth(), 1)
  );

  const firstDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  firstDayOfPreviousMonth.setUTCMonth(
    firstDayOfPreviousMonth.getUTCMonth() - 1
  );

  const lastDayOfPreviousMonth = new Date(firstDayOfPreviousMonth);
  lastDayOfPreviousMonth.setUTCMonth(lastDayOfPreviousMonth.getUTCMonth() + 1);
  lastDayOfPreviousMonth.setUTCDate(0);

  firstDayOfPreviousMonth.setUTCHours(3, 0, 0, 0);
  lastDayOfPreviousMonth.setUTCHours(3, 0, 0, 0);

  return {
    startDate: firstDayOfPreviousMonth.toISOString(),
    endDate: lastDayOfPreviousMonth.toISOString(),
  };
}
