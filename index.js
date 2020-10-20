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

function createEmployeeRecords(arr) {
    return arr.map(a => createEmployeeRecord(a))
}

function createTimeInEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

function createTimeOutEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(e => e.date === date)
    let timeOut = record.timeOutEvents.find(e => e.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(e => e.date)
    return dates.reduce((total, date) => (wagesEarnedOnDate(record, date) + total), 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll(record) {
    return record.reduce((total, person) => (allWagesFor(person) + total), 0 )
}