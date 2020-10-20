// Your code here
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

function createEmployeeRecords(array) {
    return array.map(emp => createEmployeeRecord(emp))
}

function createTimeInEvent(emp, stamp) {
    let h = (stamp.split(" ")[1].length > 3) ? stamp.slice(-4) : stamp.slice(-3)
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(h),
        date: stamp.split(" ")[0]
    })
    return emp
}

function createTimeOutEvent(emp, stamp) {
    let h = (stamp.split(" ")[1].length > 3) ? stamp.slice(-4) : stamp.slice(-3)
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(h),
        date: stamp.split(" ")[0]
    })
    return emp
}

function hoursWorkedOnDate(emp, selectDate) {
    let inHour = emp.timeInEvents.find(event => event.date === selectDate).hour;
    let outHour = emp.timeOutEvents.find(event => event.date === selectDate).hour;
    return (outHour - inHour)/100
}

function wagesEarnedOnDate(emp, selectDate) {
    return emp.payPerHour * hoursWorkedOnDate(emp, selectDate)
}

function allWagesFor(emp) {
    const dates = emp.timeInEvents.map(e => e.date)
    return dates.reduce(function(agg, current) {
        return agg += wagesEarnedOnDate(emp, current)
    }, 0)
}

function findEmployeeByFirstName(array, name) {
    return array.find(o => o.firstName === name);
}

function calculatePayroll(array) {
    return array.reduce(function(agg, emp){
        return agg += allWagesFor(emp)
    }, 0)
}