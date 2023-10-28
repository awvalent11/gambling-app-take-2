import { Colors } from '../Theme'
import { Base } from '../types/Base'
import { Box, SelectTrigger, VStack, Text, Icon } from '@gluestack-ui/themed'
import { Sun, ChevronDownIcon } from 'lucide-react-native'
import { Skeleton } from 'moti/skeleton'

type BaseSelectorProps = {
    selectedBase: Base
    setShowActionSheet: (show: boolean) => void
}

export default function BaseSelector({
                                         selectedBase,
                                         setShowActionSheet,
                                     }: BaseSelectorProps) {


    return (
        (selectedBase ? (
            <VStack>
                <Box
                    flexDirection='row'
                    alignItems='baseline'
                    paddingBottom='$0.5'
                    backgroundColor='transparent'
                    paddingHorizontal='$6'
                >
                    <SelectTrigger
                        onPress={() => setShowActionSheet(true)}
                        variant='outline'
                        backgroundColor='transparent'
                        borderColor='transparent'
                        paddingBottom='$1'
                        height='auto'
                    >
                        <Text
                            fontSize={12}
                            fontFamily='Army-Medium'
                            color={Colors.zinc950}
                        >
                            {selectedBase?.name}
                        </Text>
                        <Icon
                            as={ChevronDownIcon}
                            size={16}
                            color={Colors.zinc950}
                        />
                    </SelectTrigger>
                </Box>
            </VStack>
        ) : (
            <Skeleton colorMode='light' height={30} width='100%' />
        ))
    )
}
