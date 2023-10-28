export type Address = {
    building?: string
    streetAddress?: string
}

type FirestoreAddress = {
    building?: string
    street_address?: string
}

export const toAddress = (firestoreAddress?: FirestoreAddress): Address => {
    let building = firestoreAddress.building

    if (building && building === 'Building:') {
        building = 'Building: N/A'
    }

    return {
        building,
        streetAddress: firestoreAddress.street_address,
    }
}
