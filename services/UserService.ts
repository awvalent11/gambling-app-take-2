//import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
//import { firebaseAuth, firebaseFirestore } from 'firebaseConfig'
import { setUserBaseLocal } from './BaseLocalStorageService'
import { Base } from '../types/Base'

export async function fetchBases(): Promise<Array<Base>> {
   // const querySnapshot = await getDocs(collection(firebaseFirestore, 'bases'))
   //  return querySnapshot.docs.map((doc) => ({
   //      id: doc.id,
   //      name: doc.data().name,
   //  }))
}

export async function setUserBase(base: Base) {
    //const user = firebaseAuth.currentUser
    //const userRef = doc(firebaseFirestore, 'users', user.uid)

    // try {
    //     await setDoc(userRef, { uid: user.uid, base: base.id }) // todo refactor this to { merge: true }
    //     await setUserBaseLocal(base)
    // } catch (e) {
    //     console.error('Error storing user base: ', e)
    // }
}

export async function setUserNotificationToken(token: string) {
    // const user = firebaseAuth.currentUser
    // const userRef = doc(firebaseFirestore, 'users', user.uid)
    //
    // try {
    //     await setDoc(userRef, { token }, { merge: true })
    // } catch (e) {
    //     console.error('Error storing user token: ', e)
    // }
}
