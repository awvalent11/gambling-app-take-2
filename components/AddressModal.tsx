import { Image } from 'expo-image'
import {
    CloseIcon,
    Heading,
    HStack,
    Icon,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Pressable,
    Text,
} from '@gluestack-ui/themed'
import { Linking, Platform } from 'react-native'
import { Resource } from '../types/Resource'
import { Colors } from '../Theme'
import { ChevronRight, ClipboardCopy } from 'lucide-react-native'
import { Gate } from '../types/Gate'
import * as Clipboard from 'expo-clipboard'

type AddressModalProps = {
    resource: Resource | Gate
    showAddressModal: boolean
    setShowAddressModal: (show: boolean) => void
}
export const AddressModal = ({
                                 resource,
                                 showAddressModal,
                                 setShowAddressModal,
                             }: AddressModalProps) => {
    const handleClose = () => setShowAddressModal(false)

    return (
        <Modal isOpen={showAddressModal} onClose={handleClose}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size='lg' fontFamily='Army-Medium'>
                        Open with
                    </Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Pressable
                        onPress={() => {
                            Linking.openURL(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    resource.address.streetAddress
                                )}`
                            )
                            handleClose()
                        }}
                        p={16}
                        backgroundColor='white'
                        borderColor={Colors.zinc300}
                        borderRadius={8}
                        borderWidth={1}
                        marginVertical={6}
                    >
                        <HStack
                            space='md'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <HStack space='md' alignItems='center'>
                                <Image
                                    source={require('../assets/icon.png')}
                                    alt='google-maps-icon'
                                    style={{
                                        height: 30,
                                        width: 30,
                                    }}
                                />
                                <Text color='black' fontFamily='Army-Regular'>
                                    Google Maps
                                </Text>
                            </HStack>
                            <ChevronRight size={24} color={Colors.zinc600} />
                        </HStack>
                    </Pressable>

                    {Platform.OS === 'ios' && (
                        <Pressable
                            onPress={() => {
                                Linking.openURL(
                                    `https://maps.apple.com/?q=${encodeURIComponent(
                                        resource.address.streetAddress
                                    )}`
                                )
                                handleClose()
                            }}
                            p={16}
                            backgroundColor='white'
                            borderColor={Colors.zinc300}
                            borderRadius={8}
                            borderWidth={1}
                            marginVertical={6}
                        >
                            <HStack
                                space='md'
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <HStack space='md' alignItems='center'>
                                    {/*<Image*/}
                                    {/*    source={require('../assets/images/apple_maps_icon.png')}*/}
                                    {/*    alt='apple-maps-icon'*/}
                                    {/*    style={{*/}
                                    {/*        height: 30,*/}
                                    {/*        width: 30,*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                    <Text
                                        color='black'
                                        fontFamily='Army-Regular'
                                    >
                                        Apple Maps
                                    </Text>
                                </HStack>
                                <ChevronRight
                                    size={24}
                                    color={Colors.zinc600}
                                />
                            </HStack>
                        </Pressable>
                    )}

                    <Pressable
                        onPress={async () => {
                            await Clipboard.setStringAsync(
                                resource.address.streetAddress
                            )
                            handleClose()
                        }}
                        p={16}
                        backgroundColor='white'
                        borderColor={Colors.zinc300}
                        borderRadius={8}
                        borderWidth={1}
                        marginVertical={6}
                    >
                        <HStack
                            space='md'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <HStack space='md' alignItems='center'>
                                <ClipboardCopy
                                    size={30}
                                    color={Colors.zinc600}
                                />
                                <Text color='black' fontFamily='Army-Regular'>
                                    Copy to clipboard
                                </Text>
                            </HStack>
                            <ChevronRight size={24} color={Colors.zinc600} />
                        </HStack>
                    </Pressable>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
