// import { addDoc, collection, onSnapshot, query, serverTimestamp, Timestamp, where } from 'firebase/firestore'
import { Base } from '../types/Base'
import { Resource } from '../types/Resource'
//import { firebaseFirestore } from '../../firebaseConfig'
import { ResourceUpdate } from '../types/ResourceUpdate'

export const addResourceUpdate = async (base: Base, resource: Resource, resourceUpdate: ResourceUpdate) => {
    // Adds a new document with a generated id.
    //await addDoc(collection(firebaseFirestore, `bases/${base.id}/directory/${resource.title}/updates`), {
    //     type: resourceUpdate.type,
    //     timestamp: serverTimestamp(),
    // })
}

export const subscribeToUpdateCount = async (
    base: Base,
    resource: Resource,
    setUpdateCount: (count: number) => void,
) => {
    // const q = query(
    //     collection(firebaseFirestore, `bases/${base.id}/directory/${resource.title}/updates`),
    //     where('timestamp', '>', Timestamp.fromMillis(Date.now() - 1000 * 60 * 60 * 24)),
    // )

   // return onSnapshot(q,
   //     querySnapshot => setUpdateCount(querySnapshot.size),
   // )
}

export const subscribeToUpdates = async (
    resource: Resource,
    setUpdates: (updates: ResourceUpdate[]) => void,
) => {
    // const baseId = 'cavazos'
    //
    // const q = query(
    //     collection(firebaseFirestore, `bases/${baseId}/directory/${resource.title}/updates`),
    //     where('timestamp', '>', Timestamp.fromMillis(Date.now() - 1000 * 60 * 60 * 24)),
    // )
    //
    // return onSnapshot(q,
    //     querySnapshot => {
    //         const updates = []
    //         querySnapshot.forEach(doc => {
    //             updates.push(doc.data())
    //         })
    //         setUpdates(updates)
    //     },
    // )
}
