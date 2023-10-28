import { FadeIn} from "./FadeIn";
import { Colors } from './Theme'
import { Base } from './types/Base'
import { Box, HStack, Text } from '@gluestack-ui/themed'
import { ChevronLeft, Search } from 'lucide-react-native'
import { useEffect, useRef } from 'react'
import { Dimensions, Pressable, TextInput } from 'react-native'

type SearchBarProps = {
    isSearching: boolean
    turnOnSearch: () => void
    turnOffSearch: () => void
    selectedBase: Base | null
    setSearchTerm: (text: string) => void
    searchTerm: string
}

export default function SearchBar({
                                      isSearching,
                                      turnOnSearch,
                                      turnOffSearch,
                                      selectedBase,
                                      setSearchTerm,
                                      searchTerm,
                                  }: SearchBarProps) {
    const searchRef = useRef(null)
    useEffect(() => {
        if (isSearching) {
            searchRef.current.focus()
        } else {
            searchRef.current.clear()
            searchRef.current.blur()
        }
    }, [isSearching])

    const screenWidth = Dimensions.get('window').width

    const searchingWidth = () => screenWidth - 42 - 12 - 24 - 24
    return (
        <HStack
            alignItems='center'
            paddingHorizontal={24}
            pb='$1'
            backgroundColor='white'
            w={screenWidth}
        >
            {isSearching && (
                <Pressable onPress={turnOffSearch}>
                    <Box
                        w={42}
                        h={42}
                        borderColor={Colors.zinc200}
                        borderWidth={1}
                        borderRadius={50}
                        marginRight={12}
                    >
                        <ChevronLeft
                            style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '20%',
                            }}
                            color={Colors.zinc950}
                            size={24}
                        />
                    </Box>
                </Pressable>
            )}
            <Pressable style={{ width: '100%' }} onPress={() => turnOnSearch()}>
                <HStack
                    borderRadius={50}
                    backgroundColor='white'
                    borderColor={Colors.zinc200}
                    borderWidth={0.5}
                    space='md'
                    paddingLeft={20}
                    paddingVertical={12}
                    marginBottom={4}
                    shadowColor='#000'
                    shadowOffset={{ width: 0, height: 2 }}
                    shadowOpacity={0.08}
                    shadowRadius={4.5}
                    elevation={4}
                    width={isSearching ? searchingWidth() : '100%'}
                    onPress={() => turnOnSearch()}
                >
                    <Search size='20' color={Colors.zinc600} />
                    {!isSearching && (
                        <FadeIn>
                            <Text
                                fontFamily='Army-Regular'
                                fontSize={15}
                                lineHeight={20}
                                width='100%'
                                color={Colors.zinc600}
                            >
                                {'Search ' + selectedBase?.name}
                            </Text>
                        </FadeIn>
                    )}
                    <TextInput
                        onChangeText={setSearchTerm}
                        value={searchTerm}
                        onPressOut={() => turnOnSearch()}
                        ref={searchRef}
                        selectionColor={Colors.zinc950}
                        style={{
                            fontFamily: 'Army-Regular',
                            fontSize: 15,
                            color: Colors.zinc950,
                            borderWidth: 0,
                            flex: 1,
                            paddingRight: 12,
                        }}
                        autoCorrect={false}
                        inputMode='search'
                    />
                </HStack>
            </Pressable>
        </HStack>
    )
}
