// Your code here
function createEmployeeRecord(employee){
    return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees){
    return employees.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function(employee, dateTime){
    let [date, hour] = dateTime.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })

    return employee
}

let createTimeOutEvent = function(employee, dateTime){
    let [date, hour] = dateTime.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let hoursWorkedOnDate = function(employee, date){
    let inHour = employee.timeInEvents.find(function(e){
        return e.date === date
    })
    let outHour = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outHour.hour - inHour.hour) / 100
}

let wagesEarnedOnDate = function(employee, date){
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(employee){
    let employeeDates =  employee.timeInEvents.map(function(e){
        return e.date
    })
    let payment = employeeDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payment
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(record){
        return record.firstName === firstName
    })
}

let calculatePayroll = function(employees){
        return employees.reduce(function(memo, record){
            debugger
            return memo + allWagesFor(record)
        }, 0)
}