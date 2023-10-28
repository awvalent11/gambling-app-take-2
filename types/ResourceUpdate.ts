import { Clock4, Contact2, Hourglass, LucideIcon, MapPinOff } from 'lucide-react-native'

export const ResourceUpdateTypeArray = ['BUSY', 'HOURS', 'LOCATION', 'CONTACT']
export type ResourceUpdateType = typeof ResourceUpdateTypeArray[number]

export type ResourceUpdate = {
    type: ResourceUpdateType
}

export type ResourceUpdateOption = {
    title: string
    description: string
    icon: LucideIcon
    type: ResourceUpdateType
}

export const ResourceUpdateOptions: ResourceUpdateOption[] = [
    {
        title: 'Long wait time',
        description: 'about a long wait time',
        icon: Hourglass,
        type: 'BUSY',
    },
    {
        title: 'Hours are incorrect',
        description: 'about incorrect hours',
        icon: Clock4,
        type: 'HOURS',
    },
    {
        title: 'Location is wrong',
        description: 'about an incorrect location',
        icon: MapPinOff,
        type: 'LOCATION',
    },
    {
        title: 'Double-check contact info ',
        description: 'about incorrect contact info',
        icon: Contact2,
        type: 'CONTACT',
    },
]
