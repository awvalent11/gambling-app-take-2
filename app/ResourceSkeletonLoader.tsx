import { Colors } from './Theme'
import { Box } from '@gluestack-ui/themed'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import { View } from 'react-native'

export default function ResourceSkeletonLoader({
                                                   skeletonCount = 4,
                                                   height = 215,
                                               }) {
    return (
        <MotiView
            transition={{
                type: 'timing',
            }}
            style={{ paddingTop: 24, marginHorizontal: 24 }}
            animate={{ backgroundColor: Colors.zinc100 }}
        >
            {Array(skeletonCount)
                .fill(null)
                .map((_, index) => (
                    <View key={index}>
                        <Skeleton
                            colorMode='light'
                            height={height}
                            width='100%'
                        />
                        <Box height={24} />
                    </View>
                ))}
        </MotiView>
    )
}
