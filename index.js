// Your code here
function createEmployeeRecord(emp) {
    return {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function sliceHour(dateStamp) {
    return parseInt(dateStamp.slice(11))
}

function sliceDate(dateStamp) {
    return dateStamp.slice(0,10)
}

function createTimeOutEvent(empRecord, dateStamp) {
    let timeOutEvent = {
        type: "TimeOut",
        hour: sliceHour(dateStamp),
        date: sliceDate(dateStamp)
    }
    empRecord.timeOutEvents.push(timeOutEvent)
    return empRecord
}

function createTimeInEvent(empRecord, dateStamp) {
    let timeInEvent = {
        type: "TimeIn",
        hour: sliceHour(dateStamp),
        date: sliceDate(dateStamp)
    }
    empRecord.timeInEvents.push(timeInEvent)
    return empRecord
}

function hoursWorkedOnDate(empRecord, date) {
    const timeIn = empRecord.timeInEvents.find(timeInEvent => timeInEvent.date === date).hour
    const timeOut = empRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(empRecord, date) {
    return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour
}

function allWagesFor(empRecord) {
    const dates = empRecord.timeInEvents.map(timeInEvent => timeInEvent.date)
    return dates.reduce((totalWages, date) => {
        return wagesEarnedOnDate(empRecord, date)+totalWages
    },0)
}

function calculatePayroll(empRecords) {
    return empRecords.reduce((payroll, empRecord) => {
        return allWagesFor(empRecord)+payroll
    },0)
}

function findEmployeeByFirstName(empRecords, firstName) {
    return empRecords.find(emp => emp.firstName === firstName)
}