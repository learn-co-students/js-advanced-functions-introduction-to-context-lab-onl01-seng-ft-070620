// takes an array with 4 elements
// creates and returns a JS object with various key-val pairs
function createEmployeeRecord(arr) {
  const employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

// takes an arrays of arrays and converts each array into an employee record
// returns an array of these new record objects
function createEmployeeRecords(nestedArr) {
  return nestedArr.map(arr => createEmployeeRecord(arr))
}

// takes an employee record object and a date stamp
// returns the updated employee record
function createTimeInEvent(employee, stamp) {
  let d = stamp.split(" ")[0]
  let h = parseInt(stamp.split(" ")[1])

  employee.timeInEvents.push( {type: "TimeIn", hour: h, date: d} )

  return employee
}

// same as above function, but for time out instead
function createTimeOutEvent(employee, stamp) {
  let d = stamp.split(" ")[0]
  let h = parseInt(stamp.split(" ")[1])

  employee.timeOutEvents.push( {type: "TimeOut", hour: h, date: d} )

  return employee
}

// takes an employee record object and a date
// returns the employee's total hours worked for the given date
function hoursWorkedOnDate(employee, stamp) {
  let timeInObj = employee.timeInEvents.find(element => element.date == stamp)
  let timeOutObj = employee.timeOutEvents.find(element => element.date == stamp)

  return ((timeOutObj.hour - timeInObj.hour) / 100)
}

// multiplies an employee's pay per hour by number of hours worked
// returns that product to indicate wages for a given date
function wagesEarnedOnDate(employee, stamp) {
  return employee.payPerHour * hoursWorkedOnDate(employee, stamp)
}

// aggregates and returns an employee's all-time wages
function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(timeObj => timeObj.date)
  return dates.reduce((tot, date) => (wagesEarnedOnDate(employee, date) + tot), 0)
}

// takes an array of employee objects
// returns the matching employee record or undefined if not found
function findEmployeeByFirstName(arr, name) {
  return arr.find(employee => employee.firstName === name)
}

// takes an array of employee records
// returns the sum of all pay owed for all of those employees
function calculatePayroll(arr) {
  return arr.reduce( (tot, emp) => (allWagesFor(emp) + tot), 0  )
}
