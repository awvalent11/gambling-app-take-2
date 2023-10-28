import { Colors } from '../Theme'
import { Redirect } from 'expo-router'
import { Platform, StatusBar } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar'

export default function index() {
    // Android Fixes
    if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent')
        NavigationBar.setBackgroundColorAsync(Colors.zinc800)
    }

    return (
        <>
            <Redirect href='/home' />
        </>
    )
}