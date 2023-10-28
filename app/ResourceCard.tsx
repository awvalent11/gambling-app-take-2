//import { Unsubscribe } from 'firebase/firestore'
import { Resource } from './types/Resource'
import { Clock8, Landmark, MapPin } from 'lucide-react-native'
import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { getCurrentDay } from './components/TimeHelpers'
import { Colors } from './Theme'
import { setIsResourceFavorite } from './services/ResourceService'
import { memo, useEffect, useState } from 'react'
import { getUserBaseLocal } from './services/BaseLocalStorageService'
import { MotiView } from 'moti'
import { subscribeToUpdateCount } from './services/ResourceUpdateService'
import { AddressModal } from './components/AddressModal'
import { Link } from 'expo-router'
import BookmarkButton from './BookmarkButton'
import { FadeIn } from './FadeIn'
import { Easing } from 'react-native-reanimated'

type ResourceCardProps = {
    resource: Resource
    isFavorite: boolean
    isShowingBookmark?: boolean
}

const ResourceCard = ({
                          resource,
                          isFavorite,
                          isShowingBookmark = true,
                      }: ResourceCardProps) => {
    const [updateCount, setUpdateCount] = useState(0)
    const [showAddressModal, setShowAddressModal] = useState(false)
    //const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null)

    useEffect(() => {
        let mounted = false

        getUserBaseLocal().then((base) => {
            if (mounted) {
                subscribeToUpdateCount(base, resource, setUpdateCount).then(
                    (unsubFunction) => {
                        //setUnsubscribe(() => unsubFunction)
                    }
                )
            }
        })

        // unsubscribe on dismount
        return () => {
            //if (unsubscribe) unsubscribe()
            mounted = false
        }
    }, [])

    async function toggleIsFavorite() {
        await setIsResourceFavorite(resource, !isFavorite)
    }

    return (
        <FadeIn>
            <Link
                href={{
                    pathname: `/resource/${resource.title}`,
                    params: { isFavorite: isFavorite },
                }}
                asChild
            >
                <Pressable>
                    <VStack
                        space='md'
                        p={16}
                        backgroundColor='white'
                        borderColor={Colors.zinc50}
                        borderRadius={12}
                        borderWidth={1}
                        shadowColor='#000'
                        shadowOffset={{ width: 0, height: 1 }}
                        shadowOpacity={0.18}
                        shadowRadius={1}
                        elevation={1}
                        width='100%'
                    >
                        <HStack
                            space='sm'
                            width='100%'
                            justifyContent='space-between'
                            alignItems='flex-start'
                        >
                            <Text
                                fontFamily='Army-Bold'
                                color='black'
                                fontSize={18}
                                maxWidth='80%'
                            >
                                {resource.title}
                            </Text>
                            <HStack
                                space='sm'
                                alignItems='center'
                                marginLeft='auto'
                            >
                                {isShowingBookmark && (
                                    <BookmarkButton
                                        toggleIsFavorite={toggleIsFavorite}
                                        isFavorite={isFavorite}
                                    />
                                )}
                            </HStack>
                        </HStack>
                        {resource.schedule && (
                            <HStack space='md' alignItems='center'>
                                <Clock8 size='20' color={Colors.zinc600} />
                                <Text
                                    flexShrink={1}
                                    fontFamily='Army-Regular'
                                    fontSize={14}
                                    lineHeight={18}
                                    color={Colors.zinc800}
                                >
                                    {resource.schedule &&
                                        resource.schedule[getCurrentDay()]}
                                </Text>
                            </HStack>
                        )}
                        <VStack space='sm'>
                            {resource.address.building && (<HStack space='md' alignItems='center'>
                                <Landmark size='20' color={Colors.zinc600} />
                                <Text
                                    fontFamily='Army-Regular'
                                    fontSize={14}
                                    color={Colors.zinc800}
                                >
                                    {resource.address.building}
                                </Text>
                            </HStack>)}

                            <HStack
                                space='md'
                                justifyContent='space-between'
                                alignItems='center'
                                width='100%'
                            >
                                <HStack
                                    space='md'
                                    alignItems='center'
                                    flexShrink={1}
                                    width='62%'
                                >
                                    <MapPin size='20' color={Colors.zinc600} />
                                    <VStack>
                                        {resource.address.streetAddress
                                            .split('\n')
                                            .map((line, index) => {
                                                if (line.trim().length === 0)
                                                    return
                                                return (
                                                    <Pressable
                                                        key={index}
                                                        onPress={() =>
                                                            setShowAddressModal(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <Text
                                                            flexShrink={1}
                                                            fontFamily='Army-Regular'
                                                            fontSize={14}
                                                            lineHeight={17}
                                                            textDecorationLine='underline'
                                                            color={
                                                                Colors.zinc800
                                                            }
                                                        >
                                                            {line}
                                                        </Text>
                                                    </Pressable>
                                                )
                                            })}
                                    </VStack>
                                </HStack>

                                {updateCount > 0 && (
                                    <MotiView
                                        from={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ alignSelf: 'flex-end' }}
                                        transition={{
                                            type: 'timing',
                                            duration: 200,
                                            easing: Easing.linear,
                                        }}
                                    >
                                        <Box
                                            backgroundColor={Colors.zinc800}
                                            borderRadius={8}
                                            flexDirection='row'
                                            alignItems='center'
                                            justifyContent='center'
                                            paddingHorizontal={8}
                                        >
                                            <Text
                                                flexShrink={1}
                                                paddingLeft={1}
                                                fontSize={14}
                                                fontFamily='Army-Regular'
                                                color='white'
                                            >
                                                {`${updateCount} update${
                                                    updateCount > 1 ? 's' : ''
                                                }`}
                                            </Text>
                                        </Box>
                                    </MotiView>
                                )}
                            </HStack>
                        </VStack>
                        <AddressModal
                            resource={resource}
                            showAddressModal={showAddressModal}
                            setShowAddressModal={setShowAddressModal}
                        />
                    </VStack>
                </Pressable>
            </Link>
        </FadeIn>
    )
}

export default memo(ResourceCard)
