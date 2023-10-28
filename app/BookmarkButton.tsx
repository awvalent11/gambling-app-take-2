import { Colors } from '../Theme'
import { playSelectionHaptic } from '../utils/haptics'
import { ButtonIcon } from '@gluestack-ui/themed'
import { Bookmark } from 'lucide-react-native'
import { MotiPressable } from 'moti/interactions'
import { useMemo } from 'react'

type BookmarkButtonProps = {
    toggleIsFavorite: () => void
    isFavorite: boolean
}

export default function BookmarkButton({
                                           toggleIsFavorite,
                                           isFavorite,
                                       }: BookmarkButtonProps) {
    return (
        <MotiPressable
            hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            }}
            onPress={() => {
                playSelectionHaptic()
                toggleIsFavorite()
            }}
            //@ts-ignore
            transition={useMemo(
                () =>
                    ({ hovered, pressed }) => {
                        'worklet'

                        return pressed || hovered
                            ? {
                                type: 'timing',
                                duration: 100,
                            }
                            : {
                                type: 'spring',
                                stiffness: 700,
                                damping: 9,
                            }
                    },
                []
            )}
            animate={useMemo(
                () =>
                    ({ hovered, pressed }) => {
                        'worklet'
                        return {
                            scale: hovered || pressed ? 0.75 : 1,
                        }
                    },
                []
            )}
        >
            <ButtonIcon h={22} w={22}>
                <Bookmark
                    color={isFavorite ? Colors.zinc800 : Colors.zinc800}
                    fill={isFavorite ? Colors.zinc800 : 'none'}
                />
            </ButtonIcon>
        </MotiPressable>
    )
}