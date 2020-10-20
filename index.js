// pry = require('pryjs') // Learn does not work with this uncommented

let createEmployeeRecord = function(emp){ 
    return {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees) {
    return employees.map(function(employee) {
        // eval(pry.it) Why does pry not iterate through?
        return createEmployeeRecord(employee)
    })
}


let createTimeInEvent = function(empObj, dateStamp) {
    let timeIn = {
        type: "TimeIn",
        date: dateStamp.split(" ")[0],
        hour: Number(dateStamp.split(" ")[1])
    }
    empObj.timeInEvents.push(timeIn)
    return empObj
}

let createTimeOutEvent = function(empObj, dateStamp) {
    let timeOut = {
        type: "TimeOut",
        date: dateStamp.split(" ")[0],
        hour: Number(dateStamp.split(" ")[1])
    }
    empObj.timeOutEvents.push(timeOut)
    return empObj
}

let hoursWorkedOnDate = function(empObj, targetDate) {
    let timeIn = empObj.timeInEvents.find(timeInEvent => timeInEvent.date === targetDate)
    let timeOut = empObj.timeOutEvents.find(timeOutEvent => timeOutEvent.date === targetDate)
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(empObj, targetDate) {
    return empObj.payPerHour * hoursWorkedOnDate(empObj, targetDate)
}


let allWagesFor = function(empObj) {
    let datesWorked = empObj.timeInEvents.map(timeInEvent => timeInEvent.date)
    let totalWages = datesWorked.reduce(function(wagesCollect, date) {
        return wagesCollect + wagesEarnedOnDate(empObj, date)
    },0)
    return totalWages
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employee) {
        return employee.firstName === firstName
    })
}

let calculatePayroll = function(employees) {
     let totalWages = employees.reduce(function(wagesCollect, employee) {
        return wagesCollect + allWagesFor(employee)
    }, 0)
    return totalWages
}