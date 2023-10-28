import { fetchBases, setUserBase} from "../services/UserService";
import {
    Box,
    Pressable,
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectPortal,
    Text,
} from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import {Colors} from "../Theme";
import { Base } from '../types/Base'

type BaseSelectSliderProps = {
    setShowActionSheet: (showActionSheet: boolean) => void
    showActionSheet: boolean
    handleBaseSelect: (base: Base) => void
}

export default function BaseSelectSlider(
    // {
    //                                          setShowActionSheet,
    //                                          showActionSheet,
    //                                          handleBaseSelect,
    //                                      }: BaseSelectSliderProps
) {
    const isFocused = useIsFocused()
    const [bases, setBases] = useState([])

    useEffect(() => {
        if (!isFocused) return

        async function loadBases() {
            const basesResponse = await fetchBases()
            setBases(basesResponse)
        }

        loadBases()
    }, [isFocused])

    const handleSelect = (base: Base) => {
        //setUserBase(base)
        //handleBaseSelect(base)
        //handleClose()
    }

    const handleClose = () => {
        // setShowActionSheet(!showActionSheet)
        return
    }

    return (
        <Select>
            <SelectPortal isOpen={true} onClose={handleClose}>
                <SelectBackdrop />
                <SelectContent h='$full'>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {bases.map((base) => (
                        <Pressable
                            key={base.id}
                            style={{ width: '100%' }}
                            onPress={() => handleSelect(base)}
                        >
                            <Box w='$full' p='$3'>
                                <Text
                                    fontFamily='Army-Regular'
                                    color={Colors.zinc600}
                                >
                                    {base.name}
                                </Text>
                            </Box>
                        </Pressable>
                    ))}
                </SelectContent>
            </SelectPortal>
        </Select>
    )
}
