// Your code here
const createEmployeeRecord = function(row) {
    return {
        firstName: row[0], 
        familyName: row[1],
        title: row[2],
        payPerHour: row[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

const createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date, 
    })
    return employee
}

const createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date, 
    })
    return employee
}

const hoursWorkedOnDate = function(employee, soughtdate) {
    const inEvent = employee.timeInEvents.find(function(e) {
        return e.date === soughtdate
    })

    const outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === soughtdate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(employee, dateSought) {
    const rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour
    return parseFloat(rawWage.toString())
}

const allWagesFor = function(employee) {
    const eligibleDates = employee.timeInEvents.map(function(e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

const findEmployeeByFirstName = function(sourceArray, firstName) {
    return sourceArray.find(function(rec) {
        return rec.firstName === firstName
    })
}

const calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}