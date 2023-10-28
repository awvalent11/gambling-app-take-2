import { Base } from '../types/Base'
import { Gate, toGate } from '../types/Gate'
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    onSnapshot,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { firebaseAuth, firebaseFirestore } from 'firebaseConfig'
import { getUserBaseLocal } from './BaseLocalStorageService'

export const subscribeToGates = (base: Base, setGates, setLoading) => {
    return onSnapshot(
        collection(firebaseFirestore, `bases/${base.id}/gates`),
        (querySnapshot) => {
            let gates: Gate[] = []
            querySnapshot.forEach((doc) => {
                const gateId = doc.id
                const gate = toGate(doc.data())
                if (gate.visible) gates.push(gate)
            })
            setGates(gates)
            setLoading(false)
        }
    )
}

export const subscribeToGate = (gateTitle, setGate) => {
    // TODO: Remove hard-coded base
    // and maybe refactor to use doc.id instead othe title query?
    const gateQuery = query(
        collection(firebaseFirestore, `bases/cavazos/gates`),
        where('title', '==', gateTitle)
    )
    console.log('here', gateTitle)

    return onSnapshot(gateQuery, (querySnapshot) => {
        const doc = querySnapshot.docs[0] // Directly access the first document
        if (doc) {
            // Ensure the document exists
            const gate = toGate(doc.data())
            setGate(gate)
        }
    })
}

export async function setIsGateFavorite(gate: Gate, newValue: boolean) {
    try {
        const userUid = firebaseAuth.currentUser.uid
        const currentBaseId = (await getUserBaseLocal()).id
        const docRef = doc(
            firebaseFirestore,
            `users/${userUid}/favorites`,
            currentBaseId
        )
        if (newValue === true) {
            await setDoc(
                docRef,
                { gates: arrayUnion(gate.title) },
                { merge: true }
            )
        } else {
            await setDoc(
                docRef,
                { gates: arrayRemove(gate.title) },
                { merge: true }
            )
        }
    } catch (e) {
        console.error(e)
    }
}

export function subscribeToFavoriteGates(
    base: Base,
    setFavorites: (favorites: string[]) => void
) {
    const userUid = firebaseAuth.currentUser.uid
    const currentBaseId = base?.id ?? 'cavazos' // todo refactor this
    return onSnapshot(
        doc(firebaseFirestore, `users/${userUid}/favorites`, currentBaseId),
        (doc) => {
            setFavorites(doc.data()?.gates ?? [])
        }
    )
}
