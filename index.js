// Your code here
function createEmployeeRecord(emp){
    return {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(arr){
    return arr.map(emp=>createEmployeeRecord(emp));
}

function createTimeInEvent(employee, dateStamp){
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0],
    });
    return employee;
}

function createTimeOutEvent(employee, dateStamp){
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0],
    });
    return employee;
}

function hoursWorkedOnDate(employee, dateStamp){
    const { hour: hourIn } = employee.timeInEvents.find(timeInEvent=>timeInEvent.date === dateStamp);
    const { hour: hourOut } = employee.timeOutEvents.find(timeOutEvent=>timeOutEvent.date === dateStamp);
    return (hourOut - hourIn) / 100;
}

function wagesEarnedOnDate(employee, dateStamp){
    return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour;
}

function allWagesFor(employee){
    return employee.timeInEvents.reduce((pv, cv) =>  pv + wagesEarnedOnDate(employee, cv.date), 0);
}

function calculatePayroll(employeeArr){
    return employeeArr.reduce((pv, cv) => pv + allWagesFor(cv), 0);
}