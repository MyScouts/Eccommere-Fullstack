const addMinWithNow = (total) => new Date().setHours(new Date().getMinutes() + total)

const addDateWithNow = (total) => new Date().setDate(new Date().getDate() + total)

const compareDateNow = (date) => {
    let now = new Date()

    if (now.getTime() == date.getTime()) {
        // date = now
        return 1;
    } else if (now.getTime() < date.getTime()) {
        // date > now
        return 2;
    } else {
        // date < now
        return 0;
    }
}


const getNowToNumber = () => new Date().getTime()

module.exports = {
    addMinWithNow,
    compareDateNow,
    addDateWithNow,
    getNowToNumber
}