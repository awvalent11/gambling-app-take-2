import AsyncStorage from '@react-native-async-storage/async-storage'
import {Base} from "../types/Base";

export async function setUserBaseLocal(base: Base) {
    return await AsyncStorage.multiSet([
        ['user_base_id', base.id],
        ['user_base_name', base.name],
    ])
}

export async function getUserBaseLocal(): Promise<Base> {
    const baseId = await AsyncStorage.getItem('user_base_id')
    const baseName = await AsyncStorage.getItem('user_base_name')
    return { id: baseId, name: baseName }
}
