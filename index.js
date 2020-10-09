function createEmployeeRecord(array) {
  let obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return obj;
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(record, dateStamp) {
  const timeIn = {
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0]
  }
  record.timeInEvents.push(timeIn);
  return record;
}

function createTimeOutEvent(record, dateStamp) {
  const timeOut = {
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0]
  }
  record.timeOutEvents.push(timeOut);
  return record;
}

function hoursWorkedOnDate(record, date) {
  let timeIn = record.timeInEvents.find(event => event.date === date);
  let timeOut = record.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
  let dailyWages = record.timeInEvents.map(event => wagesEarnedOnDate(record, event.date));
  return dailyWages.reduce((total, wage) => total + wage);
}

function findEmployeeByFirstName(records, firstName) {
  return records.find(record => record.firstName === firstName);
}

function calculatePayroll(records) {
  let allEmployeeWages = records.map(record => allWagesFor(record));
  return allEmployeeWages.reduce((total, wage) => total + wage);
  // or:
  // return records.reduce(function(total, wage) {
  //   return total + allWagesFor(wage);
  // }, 0)
}