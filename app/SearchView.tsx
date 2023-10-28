import { Colors } from './Theme'
import { PackageOpen, Search } from 'lucide-react-native'
import { AnimatePresence, MotiView } from 'moti'
import Fuse from 'fuse.js'
import { memo, useMemo } from 'react'
import { Resource } from './types/Resource'
import { VStack, Text, Box } from '@gluestack-ui/themed'
import { ResourceExploreList } from './ResourceExploreList'
import { Easing } from 'react-native-reanimated'

type SearchViewProps = {
    isSearching: boolean
    searchTerm: string
    resources: Resource[]
    favorites: string[]
}

type TransformedResource = Resource & {
    transformedCategories: string[]
}

const SearchView = ({
                        isSearching,
                        searchTerm,
                        resources,
                        favorites,
                    }: SearchViewProps) => {
    const fuse = useMemo(() => {
        const options = {
            threshold: 0.3,
            keys: [
                'title',
                'transformedCategories',
                'address.streetAddress',
                'address.building',
                'searchTerms',
            ],
        }

        const transformedResources: TransformedResource[] = resources.map(
            (resource) => ({
                ...resource,
                transformedCategories: Object.keys(resource.categories).filter(
                    (key) => resource.categories[key]
                ),
            })
        )

        return new Fuse(transformedResources, options)
    }, [resources])

    const results = useMemo(() => {
        if (!searchTerm) return null

        const searchResults = fuse.search(searchTerm)

        return searchResults.map((fuseResult) => fuseResult.item)
    }, [fuse, searchTerm, resources])

    const content = () => {
        if (!searchTerm) {
            return (
                <AnimationWrapper>
                    <VStack marginTop={150} alignItems='center' space='md'>
                        <VStack>
                            <Text
                                color={Colors.zinc500}
                                fontFamily='Army-Medium'
                                fontSize={24}
                                lineHeight={undefined}
                                textAlign='center'
                            >
                                What are you
                            </Text>
                            <Text
                                color={Colors.zinc500}
                                fontFamily='Army-Medium'
                                fontSize={24}
                                lineHeight={undefined}
                                textAlign='center'
                            >
                                looking for?
                            </Text>
                        </VStack>
                        <Search
                            strokeWidth={1}
                            color={Colors.zinc500}
                            size={128}
                        />
                    </VStack>
                </AnimationWrapper>
            )
        }

        if (results.length === 0) {
            return (
                <AnimationWrapper>
                    <VStack marginTop={175} alignItems='center' space='md'>
                        <Text
                            color={Colors.zinc500}
                            fontFamily='Army-Medium'
                            fontSize={32}
                            lineHeight={undefined}
                        >
                            Nothing found
                        </Text>
                        <PackageOpen
                            strokeWidth={1}
                            color={Colors.zinc500}
                            size={128}
                        />
                    </VStack>
                </AnimationWrapper>
            )
        }
        return (
            <Box style={{ marginHorizontal: 24, width: '100%' }}>
                <ResourceExploreList
                    resources={results}
                    favorites={favorites}
                />
            </Box>
        )
    }

    return (
        <MotiView
            animate={{
                opacity: isSearching ? 1 : 0,
                scale: isSearching ? 1 : 0.95,
            }}
            transition={{
                type: 'timing',
                duration: 150,
                easing: Easing.linear,
            }}
            style={{
                marginTop: 16,
                backgroundColor: Colors.zinc100,
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                position: 'absolute',
                pointerEvents: isSearching ? 'auto' : 'none',
            }}
        >
            <>
                <Box
                    width='100%'
                    height={1}
                    backgroundColor='white'
                    shadowColor='#000'
                    shadowOffset={{ width: 0, height: 0.5 }}
                    shadowOpacity={0.05}
                    shadowRadius={1}
                    elevation={1}
                />
                {content()}
            </>
        </MotiView>
    )
}

export default memo(SearchView)

const AnimationWrapper = ({ children }) => {
    return (
        <AnimatePresence>
            <MotiView
                from={{
                    opacity: 0,
                    scale: 0.95,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    type: 'timing',
                    duration: 150,
                    easing: Easing.linear,
                }}
                style={{
                    marginTop: 16,
                    backgroundColor: Colors.zinc100,
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                }}
            >
                {children}
            </MotiView>
        </AnimatePresence>
    )
}
