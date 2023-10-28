import { AnimatePresence, MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'

export const FadeIn = ({ children }) => {
    return (
        <MotiView
            from={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            transition={{
                type: 'timing',
                duration: 150,
                easing: Easing.linear,
            }}
        >
            {children}
        </MotiView>
    )
}