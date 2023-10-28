import { DocumentData } from 'firebase/firestore'
import { Address, toAddress } from './Address'

export const DAYS_CONST = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
] as const
type dayOfWeek = (typeof DAYS_CONST)[number]

const days: dayOfWeek[] = [...DAYS_CONST]

export type GateSchedule = {
    [key in dayOfWeek]: string[]
}

export type Gate = {
    title: string
    address: Address
    flow: number
    previousFlow: number
    status: boolean
    schedule: GateSchedule
    visible: boolean
}

export const toGate = (firebaseDocument: DocumentData): Gate => {
    let gateStatus = false

    if (firebaseDocument && firebaseDocument.schedule) {
        const schedule = firebaseDocument.schedule ?? {}

        const today = new Date()
        const dayName = days[today.getDay()]
        const openHours = schedule[dayName]
        gateStatus = isOpen(openHours, today.toLocaleTimeString())
        console.log('gate status', gateStatus)
        console.log(dayName)
    }

    return {
        title: firebaseDocument?.title || '',
        address: { streetAddress: firebaseDocument.address, building: null },
        flow: firebaseDocument?.flow || 0,
        previousFlow: firebaseDocument?.previous_flow ?? 100,
        status: gateStatus,
        schedule: firebaseDocument?.schedule || {},
        visible: firebaseDocument?.visible || false,
    }
}

function isOpen(openHours, time) {
    if (!openHours || openHours.length === 0) {
        throw new Error('Invalid open hours provided')
    }
    // Convert time to 24-hour format HHMM
    const timeParts = time.split(':')
    let hours = parseInt(timeParts[0], 10)
    const minutes = parseInt(timeParts[1], 10)

    if (time.includes('PM') && hours !== 12) {
        hours += 12
    }
    if (time.includes('AM') && hours === 12) {
        hours = 0
    }
    const currentTime = hours * 100 + minutes

    for (const slot of openHours) {
        if (slot === '24/7') {
            return true
        }
        if (slot === 'closed') {
            return false
        }

        const [start, end] = slot.split('-').map((t) => parseInt(t, 10))

        if (currentTime >= start && currentTime <= end) {
            return true
        }
    }
    return false
}
