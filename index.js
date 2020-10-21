// arr represents an employees info arr = [firstName, lastName, title, wage]

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// let createEmployeeRecord = function(row){
//     return {
//         firstName: row[0],
//         familyName: row[1],
//         title: row[2],
//         payPerHour: row[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     }

function createEmployeeRecords(allEmpData) {
    return allEmpData.map(createEmployeeRecord)
}
// let createEmployeeRecords = function(employeeRowData) {
//     return employeeRowData.map(function(row){
//         return createEmployeeRecord(row)
//     })
// }

function createTimeInEvent(employee, timestamp) {
    let [date, hour] = timestamp.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, timestamp) {
    let [date, hour] = timestamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let workDayIn = employee.timeInEvents.find(timeInEvent => timeInEvent.date === date)
    let workDayOut = employee.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)

    let hourIn = workDayIn.hour
    let hourOut = workDayOut.hour

    let hoursWorked = (hourOut - hourIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    let timeWorked =  hoursWorkedOnDate(employee, date)
    let wage = employee.payPerHour

    return timeWorked * wage
}

function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(timeInEvent => timeInEvent.date)

    let paycheck = datesWorked.reduce((tally, date) => tally + wagesEarnedOnDate(employee, date), 0)
    return paycheck
}

function findEmployeeByFirstName(employeeArray, employeeName) {
    return employeeArray.find(employeeInfo => employeeInfo.firstName)
}
function calculatePayroll(employeesArray) {
    return employeesArray.reduce((payrollTally, employee) => payrollTally + allWagesFor(employee), 0)
}



