import { Platform } from 'react-native'
import * as Haptics from 'expo-haptics'

export const playSelectionHaptic = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Haptics.selectionAsync()
    }
}
