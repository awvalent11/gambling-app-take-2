import React, { useDeferredValue, useEffect, useState } from 'react'
import { Box } from '@gluestack-ui/themed'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {
    Activity,
    Car, Dumbbell,
    LucideIcon,
    ShieldCheck,
    Users,
    UserSquare2,
    Utensils,
} from 'lucide-react-native'
import BaseSelectSlider from "./BaseSelectSlider";
import { getUserBaseLocal} from "../services/BaseLocalStorageService";
import { MotiView } from 'moti'
import SearchView from "./SearchView";
import { Colors } from '../Theme'
import { Base } from '../types/Base'
import { Category } from '../types/Category'
import { playSelectionHaptic} from "../utils/haptics";
import {
    getBaseResources,
    subscribeToFavoriteResources,
} from '../services/ResourceService'
import { Resource } from '../types/Resource'
//import { Unsubscribe } from 'firebase/firestore'
import BaseSelector from "../components/BaseSelector";
import SearchBar from './SearchBar'
import { subscribeToFavoriteGates } from '../services/GateService'
import { ResourceExploreList } from './ResourceExploreList'
import GateExploreList from '../components/GateExploreList'
import { FadeIn } from './FadeIn'
import { Easing } from 'react-native-reanimated'
import {data} from "../data";

const Tab = createMaterialTopTabNavigator()

type CategoryTab = {
    name: string
    Icon: LucideIcon
    category?: Category
}

const tabConfig: CategoryTab[] = [
    { name: 'Gates', Icon: Car, category: Category.GATES },
    { name: 'Soldier', Icon: UserSquare2, category: Category.SOLDIER },
    { name: 'Fitness', Icon: Dumbbell, category: Category.FITNESS},
    { name: 'Food', Icon: Utensils, category: Category.FOOD },
    { name: 'Support', Icon: Users, category: Category.SUPPORT },
    { name: 'Medical', Icon: Activity, category: Category.MEDICAL },
    { name: 'Safety', Icon: ShieldCheck, category: Category.SAFETY },
]

const navbarScreenOptions = {
    swipeEnabled: false,
    tabBarScrollEnabled: true,
    tabBarItemStyle: {
        flex: 1,
        width: 'auto',
        minWidth: 90,
        paddingHorizontal: 12,
    },
    tabBarLabelStyle: {
        textTransform: 'capitalize',
        fontSize: 14,
        fontFamily: 'Army-Medium',
    },
    tabBarIndicatorStyle: {
        backgroundColor: Colors.zinc950,
    },
    tabBarActiveTintColor: Colors.zinc950,
    tabBarInactiveTintColor: Colors.zinc500,
} as any // hehe

export const HomeScreen =() => {
    const [showActionSheet, setShowActionSheet] = useState(false)
    const [selectedBase, setSelectedBase] = useState<Base | null>(null)
    const [favoriteResources, setFavoriteResources] = useState<string[]>([])
    const [favoriteGates, setFavoriteGates] = useState<string[]>([])
    const [resources, setResources] = useState<Resource[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const deferredSearchTerm = useDeferredValue(searchTerm)

    const turnOffSearch = () => {
        setIsSearching(false)
        setSearchTerm('')
    }

    const turnOnSearch = () => {
        if (!isSearching) {
            playSelectionHaptic()
            setSearchTerm('')
        }

        setIsSearching(true)
    }

    const getUserBets = (id: number) => {
        for (const bet of data){
            if(id===bet.buy_user_id | id===bet.sell_user_id){
                return bet
            }
        }
        console.log('Could not find ID')
    }

    useEffect(() => {
            getUserBets(11)
        }

        //let unsubscribeFavoriteResources: Unsubscribe
        //let unsubscribeFavoriteGates: Unsubscribe
        // loadBaseData()
        //     .then(
        //         () =>
        //             (unsubscribeFavoriteResources =
        //                 subscribeToFavoriteResources(
        //                     selectedBase,
        //                     setFavoriteResources
        //                 ))
        //     )
        //     .then(
        //         () =>
        //             (unsubscribeFavoriteGates = subscribeToFavoriteGates(
        //                 selectedBase,
        //                 setFavoriteGates
        //             ))
        //     )

        // unsubscribe on dismount
        // return () => {
        //     unsubscribeFavoriteResources()
        //     unsubscribeFavoriteGates()
        // }
    , [])

    async function handleBaseSelect(base: Base) {
        setSelectedBase(base)
    }

    function getResources(category: Category) {
        return resources.filter((resource) => resource.categories[category])
    }

    return (
        <>
            <FadeIn>
                <BaseSelector
                    selectedBase={selectedBase}
                    setShowActionSheet={setShowActionSheet}
                />
            </FadeIn>
            <SearchBar
                isSearching={isSearching}
                turnOnSearch={turnOnSearch}
                turnOffSearch={turnOffSearch}
                selectedBase={selectedBase}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />

            {/* Either SearchView or Navigation is rendered. Based on isSearching */}
            <Box h='100%' w='100%' flex={1}>
                <SearchView
                    isSearching={isSearching}
                    resources={resources}
                    searchTerm={deferredSearchTerm}
                    favorites={favoriteResources}
                />
                <MotiView
                    animate={{
                        opacity: isSearching ? 0 : 1,
                        scale: isSearching ? 0.95 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 150,
                        easing: Easing.linear,
                    }}
                    style={{
                        flex: 1,
                        pointerEvents: isSearching ? 'none' : 'auto',
                    }}
                >
                    <Tab.Navigator
                        initialRouteName='Gates'
                        screenOptions={navbarScreenOptions}
                        sceneContainerStyle={{
                            backgroundColor: Colors.zinc100,
                        }}
                    >
                        {tabConfig.map(({ name, Icon, category }) => (
                            <Tab.Screen
                                key={name}
                                name={name}
                                options={{
                                    tabBarIcon: ({ focused }) => (
                                        <Icon
                                            color={
                                                focused
                                                    ? Colors.zinc950
                                                    : Colors.zinc500
                                            }
                                        />
                                    ),
                                }}
                                listeners={{
                                    tabPress: () => playSelectionHaptic(),
                                }}
                            >
                                {() => {
                                    if (category === Category.GATES) {
                                        return (
                                            <GateExploreList
                                                base={selectedBase}
                                                favorites={favoriteGates}
                                            />
                                        )
                                    } else {
                                        return (
                                            <ResourceExploreList
                                                resources={getResources(
                                                    category
                                                )}
                                                favorites={favoriteResources}
                                            />
                                        )
                                    }
                                }}
                            </Tab.Screen>
                        ))}
                    </Tab.Navigator>
                </MotiView>
            </Box>

            <BaseSelectSlider
                setShowActionSheet={setShowActionSheet}
                showActionSheet={showActionSheet}
                handleBaseSelect={handleBaseSelect}
            />
        </>
    )
}
