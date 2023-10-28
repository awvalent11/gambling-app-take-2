import { ScrollView } from '@gluestack-ui/themed'
import {HomeScreen} from "./HomeScreen";

export default function Home() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <HomeScreen/>
        </ScrollView>
    )
}
