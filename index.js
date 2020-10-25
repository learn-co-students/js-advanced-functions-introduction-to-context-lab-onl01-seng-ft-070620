// Your code here
function createEmployeeRecord(employeeInfo){
 const employee = {
   firstName: employeeInfo[0],
   familyName: employeeInfo[1],
   title: employeeInfo[2],
   payPerHour: employeeInfo[3],
   timeInEvents: [],
   timeOutEvents: []
 }
 return employee
}

function createEmployeeRecords(employees){
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, dateStamp){
  const [date, hour] = dateStamp.split(' ')
  
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date: date
  })

  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
  const [date, hour] = dateStamp.split(' ')
  
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date: date
  })

  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
  let inEvent = employeeRecord.timeInEvents.find(e => { return e.date === date })

  let outEvent = employeeRecord.timeOutEvents.find(e => { return e.date === date })

  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hours = hoursWorkedOnDate(employeeRecord, date)

  return hours * employeeRecord.payPerHour
}

function allWagesFor(employee){
  let eligibleDates = employee.timeInEvents.map(e => { return e.date })

  return eligibleDates.reduce((memo, d) => {
      return memo + wagesEarnedOnDate(employee, d)
  }, 0)
}

function findEmployeeByFirstName(employees, firstName){
  return employees.find(employee => { return employee.firstName === firstName })
}

function calculatePayroll(employees){
  return employees.reduce((memo, employee) => { return memo + allWagesFor(employee) }, 0)
}