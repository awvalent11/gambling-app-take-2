import { Base } from '../types/Base'
import { Resource, toResource } from '../types/Resource'
//import { firebaseAuth, firebaseFirestore } from '../../firebaseConfig'
// import {
//     arrayRemove,
//     arrayUnion,
//     collection,
//     doc,
//     getDoc,
//     getDocs,
//     limit,
//     onSnapshot,
//     query,
//     setDoc,
//     where,
// } from 'firebase/firestore'
import { Category } from '../types/Category'
import { getUserBaseLocal } from './BaseLocalStorageService'
import { Schedule } from '../types/Schedule'
import { Address } from '../types/Address'
import { Gate } from '../types/Gate'

export async function getBaseResources(
    base: Base,
    category?: Category
): Promise<Resource[]> {
    //TODO: Change back to production version
    //let q = query(collection(firebaseFirestore, `bases/${base.id}/directory`))
    if (category) {
    //    q = query(q, where(`categories.${category}`, '==', true), limit(10))
    }
    //const querySnapshot = await getDocs(q)
    //return querySnapshot.docs.map((doc) => toResource(doc.data()))
}

export async function setIsResourceFavorite(
    resource: Resource,
    newValue: boolean
) {
    try {
        // const userUid = firebaseAuth.currentUser.uid
        // const currentBaseId = (await getUserBaseLocal()).id
        // const docRef = doc(
        //     firebaseFirestore,
        //     `users/${userUid}/favorites`,
        //     currentBaseId
        // )
        // if (newValue === true) {
        //     await setDoc(
        //         docRef,
        //         { resources: arrayUnion(resource.title) },
        //         { merge: true }
        //     )
        // } else {
        //     await setDoc(
        //         docRef,
        //         { resources: arrayRemove(resource.title) },
        //         { merge: true }
        //     )
        // }
    } catch (e) {
        console.error(e)
    }
}

export function subscribeToFavoriteResources(
    base: Base,
    setFavorites: (favorites: string[]) => void
) {
    // const userUid = firebaseAuth.currentUser.uid
    // const currentBaseId = base?.id ?? 'cavazos' // todo refactor this
    // return onSnapshot(
    //     doc(firebaseFirestore, `users/${userUid}/favorites`, currentBaseId),
    //     (doc) => setFavorites(doc.data()?.resources ?? [])
    // )
}

export async function fetchResource(resourceTitle) {
    // TODO: Remove hard-coded base
    // const documentRef = doc(
    //     firebaseFirestore,
    //     'bases/cavazos/directory',
    //     resourceTitle
    // )
    //
    // const documentSnapshot = await getDoc(documentRef)
    //
    // if (documentSnapshot.exists()) {
    //     return toResource(documentSnapshot.data())
    // } else {
    //     console.log('Document does not exist')
    // }
}
