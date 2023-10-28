import { Category } from '../types/Category'
import { DocumentData } from 'firebase/firestore'
import { Address, toAddress } from '../types/Address'
import { Schedule } from '../types/Schedule'

export type Resource = {
    title: string
    description?: string
    notice?: string
    phoneNumbers?: string[]
    schedule?: Schedule
    website?: string
    address?: Address
    categories?: { [key in Category]: boolean }
    searchTerms?: string[]
}

export const toResource = (firebaseDocument: DocumentData): Resource => ({
    title: firebaseDocument.title ?? '',
    description: firebaseDocument.description,
    notice: firebaseDocument.notice,
    phoneNumbers: firebaseDocument.phone_numbers ?? [],
    schedule: firebaseDocument.schedule,
    website: firebaseDocument.website,
    address: toAddress(firebaseDocument.address),
    categories: firebaseDocument.categories ?? {},
    searchTerms: firebaseDocument.search_terms ?? [],
})
