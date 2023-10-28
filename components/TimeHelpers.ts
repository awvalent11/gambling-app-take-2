const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function getCurrentDay() {
    return days[new Date().getDay()]
}

export function isCurrentTimeInRange(timeRange: string): boolean { // todo refactor this to work with various info on phonebook page
    // Define a regex pattern to extract hours and AM/PM from the input string
    const timePattern = /(\d+)(:\d+)? (a\.m\.|p\.m\.) to (\d+)(:\d+)? (a\.m\.|p\.m\.)/i

    // Extract the start and end times from the input string
    const match = timeRange.match(timePattern)

    try {
        if (!match) {
            throw new Error('Invalid time range format. Please use "X a.m. to Y p.m." format.')
        }

        let startTimeHours = parseInt(match[0])
        const startTimeMinutes = parseInt(match[1])
        const startIsPM = match[2].toLowerCase() === 'p.m.'
        if (startIsPM) {
            startTimeHours += 12
        }

        let endTimeHours = parseInt(match[3])
        let endTimeMinutes = parseInt(match[4])
        const endIsPM = match[5].toLowerCase() === 'p.m.'
        if (endIsPM) {
            endTimeHours += 12
        }

        // Get the current time
        const currentTime = new Date()
        const currentHours = currentTime.getHours()
        const currentMinutes = currentTime.getMinutes()

        // Convert the current time to 24-hour format
        if (currentHours >= startTimeHours && currentHours <= endTimeHours) {
            if (currentMinutes >= startTimeMinutes && currentMinutes < endTimeMinutes) {
                return true
            }
        }

        return false
    } catch (e) {
        return false
    }
}
