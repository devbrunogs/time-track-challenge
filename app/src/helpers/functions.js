const dateHelper = new Date()
const laborHours = "08:30"

export function generateToken() {
    return Math.random().toString(36).substring(2)
}

export function checkForNegativeHours(string) {
    return string && string.indexOf('-') === -1
}

export function getDaysInMonth(year = dateHelper.getFullYear(), month = dateHelper.getMonth()) {
    return new Date(year, month + 1, 0).getDate();
}

export function getCurrentYear() {
    return dateHelper.getFullYear()
}

export function getCurrentMonth() {
    return dateHelper.getMonth()
}

export function convertHourToSeconds(hourString) {
    const splitHour = hourString.split(':')

    return (splitHour[0] * 3600) + (splitHour[1] * 60)
}

export function convertSecondsToHours(seconds) {
    const secondsToMinutes = seconds / 60
    const hours = Math.floor(secondsToMinutes / 60).toString()
    const minutes = (secondsToMinutes % 60).toString()

    return `${hours}:${minutes.length < 2 ? minutes + '0' : minutes}`
}

export function getHoursDifferenceSeconds(enter, leave) {
    const leaveSeconds = convertHourToSeconds(leave)
    const enterSeconds = convertHourToSeconds(enter)

    return leaveSeconds - enterSeconds
}

export function getHoursDifferenceString(enter, leave) {
    return new Date(getHoursDifferenceSeconds(enter, leave) * 1000).toISOString().substr(11, 5)
}

export function getHoursDifferenceStringWithSeconds(enter, leave) {
    return new Date((leave - enter) * 1000).toISOString().substr(11, 5)
}

export function getHoursTotalString(enter, leave) {
    return new Date((enter + leave) * 1000).toISOString().substr(11, 5)
}

export function getLaborDaysInMonth(year = dateHelper.getFullYear(), month = dateHelper.getMonth()) {
    let date = new Date(year, month, 1);
    let days = [];
    let day, weekDay, tmpDate

    while (date.getMonth() === month) {
        // Exclude weekends
        tmpDate = new Date(date);
        weekDay = tmpDate.getDay(); // week day
        day = tmpDate.getDate(); // day

        // exclude 0=Sunday and 6=Saturday
        if (weekDay % 6)
            days.push(day);

        date.setDate(date.getDate() + 1);
    }

    return days;
}

export function buildMonthData(year, month, uid) {
    const days = getDaysInMonth(year, month)
    const laborDays = getLaborDaysInMonth(year, month).length
    const hoursNeeded = convertSecondsToHours(laborDays * (convertHourToSeconds(laborHours)))
    const hoursTable = new Array(days).fill(
        {
            arrive: "00:00",
            lunchBreak: "00:00",
            lunchReturn: "00:00",
            exit: "00:00",
            total: "00:00",
            diff: "00:00"
        }
    )

    return {
        "uid": uid,
        "month": month,
        "year": year,
        "total_hours": `00:00`,
        "needed_hours": `${hoursNeeded}`,
        "diff_hours": `-${hoursNeeded}`,
        "data": hoursTable
    }
}

export function totalHoursReducer(accumulator, currentValue) {
    return accumulator + convertHourToSeconds(currentValue.total)
}

export function buildMonthUpdatedData(rowIndex, rowInfo, currentMonthData) {
    let newMonthData = { ...currentMonthData }
    let monthTotalHours, hoursDiff, hoursNeededInSeconds = convertHourToSeconds(newMonthData.needed_hours)

    newMonthData.data.splice(rowIndex, 1, rowInfo)

    monthTotalHours = newMonthData.data.reduce(totalHoursReducer, 0)

    hoursNeededInSeconds -= monthTotalHours

    if (hoursNeededInSeconds > 0) {
        hoursDiff = convertSecondsToHours(hoursNeededInSeconds)
        hoursDiff = `-${hoursDiff}`
    } else {
        hoursDiff = convertSecondsToHours(-(hoursNeededInSeconds))
    }

    return {
        ...newMonthData,
        total_hours: convertSecondsToHours(monthTotalHours),
        diff_hours: hoursDiff
    }
}