// Your code here
function createEmployeeRecord(array)
{
    const [firstName, familyName, title, payPerHour] = array
    let result = {firstName, familyName, title, payPerHour}
    result.timeInEvents = []
    result.timeOutEvents = []
    return result
}

function createEmployeeRecords(arrays)
{
    return arrays.map(function(array){return createEmployeeRecord(array)})
}

function createTimeInEvent(record, datetime)
{
    let dateInfo = datetime.split(" ")
    let event = {}
    event.date = dateInfo[0]
    event.hour = Number(dateInfo[1])
    event.type = 'TimeIn'
    record.timeInEvents.push(event)
    return record
}

function createTimeOutEvent(record, datetime)
{
    let dateInfo = datetime.split(" ")
    let event = {}
    event.date = dateInfo[0]
    event.hour = Number(dateInfo[1])
    event.type = 'TimeOut'
    record.timeOutEvents.push(event)
    return record
}

function hoursWorkedOnDate(record, date)
{
    let inn = record.timeInEvents.find(function(element){return (element.date == date)})
    let out = record.timeOutEvents.find(function(element){return (element.date == date)})
    let inHour = inn.hour/100
    let outHour = out.hour/100
    return outHour - inHour
}

function wagesEarnedOnDate(record, date)
{
    return record.payPerHour * hoursWorkedOnDate(record, date)
}

function allWagesFor(record)
{
    let dates = record.timeInEvents.map(function(event){return event.date})
    return dates.reduce(function(total, date){return total + wagesEarnedOnDate(record, date)}, 0)
}

function calculatePayroll(records)
{
    return records.reduce(function(total, record){return total + allWagesFor(record)}, 0)
}

function findEmployeeByFirstName(records, name)
{
    return records.find(function(element){return (element.firstName == name)})
}