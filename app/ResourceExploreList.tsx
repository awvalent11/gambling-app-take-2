import React from 'react'
import { Resource } from './types/Resource'
import ResourceCard from './ResourceCard'
import ResourceSkeletonLoader from './ResourceSkeletonLoader'
import { useIsFocused } from '@react-navigation/native'
import { FlatList } from 'react-native'

type ListScreenProps = {
    resources: Resource[]
    favorites: string[]
}

export function ResourceExploreList({ resources, favorites }: ListScreenProps) {
    const isFocused = useIsFocused()

    return isFocused ? (
        <FlatList
            keyboardShouldPersistTaps='always' // This prop ensures clicks/taps pass through even when the keyboard is up
            contentContainerStyle={{ paddingVertical: 24, gap: 24 }}
            showsVerticalScrollIndicator={false}
            style={{
                marginHorizontal: 24,
            }}
            data={resources}
            keyExtractor={(item) => item.title}
            initialNumToRender={3}
            maxToRenderPerBatch={4}
            windowSize={2}
            renderItem={({ item: resource }) => {
                return (
                    <ResourceCard
                        resource={resource}
                        isFavorite={favorites.includes(resource.title)}
                    />
                )
            }}
        />
    ) : (
        <ResourceSkeletonLoader height={215} />
    )
}
