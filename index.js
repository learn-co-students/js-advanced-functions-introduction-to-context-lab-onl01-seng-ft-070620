function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrOfArrs){
  const nuArr = arrOfArrs.map(arr => createEmployeeRecord(arr))
  return nuArr
}

function createTimeInEvent(employeeObj, date) {
  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(date.slice(-4)),
    date: date.slice(0, 10)
  }
  employeeObj.timeInEvents.push(timeInEvent)
  return employeeObj
}

function createTimeOutEvent(employeeObj, date) {
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(date.slice(-4)),
    date: date.slice(0, 10)
  }
  employeeObj.timeOutEvents.push(timeOutEvent)
  return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
  let inEvent = employeeObj.timeInEvents.find(function(e) {
    return e.date === date
  })

  let outEvent = employeeObj.timeOutEvents.find(function(e) {
    return e.date === date
  })

  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeObj, date) {
  return (hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour)
}

function allWagesFor(employeeObj) {
  let date = ''
  let total = 0
  for (let i = 0; i < employeeObj.timeInEvents.length; i++) {
    date = employeeObj.timeInEvents[i].date
    total += wagesEarnedOnDate(employeeObj, date)
  }
  return total
}

function calculatePayroll(arr) {
  return arr.reduce(function(total, object){
    return total + allWagesFor(object)
  }, 0)
}

function findEmployeeByFirstName(arr, firstName) {
  const employee = arr.find(function(e) {
    console.log(e.firstName)
    return e.firstName === firstName
  })
  return employee
}