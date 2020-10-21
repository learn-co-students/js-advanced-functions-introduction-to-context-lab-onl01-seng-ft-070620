// pry = require('pryjs')

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(nestedArray) {
    return nestedArray.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(empObj, timestamp) {
    const updateEvent = {
        type: "TimeIn",
        hour: parseInt(timestamp.split(" ")[1]),
        date: timestamp.split(" ")[0]
    }
    empObj.timeInEvents.push(updateEvent)
    return empObj
}

function createTimeOutEvent(empObj, timestamp) {
    const updateEvent = {
        type: "TimeOut",
        hour: parseInt(timestamp.split(" ")[1]),
        date: timestamp.split(" ")[0]
    }
    empObj.timeOutEvents.push(updateEvent)
    return empObj
}

function hoursWorkedOnDate(empObj, date) {
    const timeIn = empObj.timeInEvents.find(obj => obj["date"] === date)
    const timeOut = empObj.timeOutEvents.find(obj => obj["date"] === date)
    
    return (timeOut["hour"] - timeIn["hour"]) / 100
}

function wagesEarnedOnDate(empObj, date) {
    return hoursWorkedOnDate(empObj, date) * empObj["payPerHour"]
}

function allWagesFor(empObj) {
    const datesWorked = empObj.timeInEvents.map(clockIn => clockIn.date)
    const wages = datesWorked.map(date => wagesEarnedOnDate(empObj, date))
    
    return wages.reduce((wage, total)=> wage += total)
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name)
}

function calculatePayroll(employees) {
    // eval(pry.it)
    return employees.reduce((pay, total) => {
        return pay + allWagesFor(total)
    }, 0)

    // return employees.reduce((pay, total) => pay += allWagesFor(total))
}