
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import SourceArticles from "../SourceArticles";
import SourceBuffet from "../SourceBuffet";
import SourceHeader from "../SourceHeader";
import coinFeedStore, { CoinFeedStoreContext } from "../../modules/CoinFeedStore";
import Theme from "../../modules/theme";
import { fetchSources, fetchSourcesFromLocalStorage } from "../../modules/utils";
import AppLoading from "expo-app-loading";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

const Home = observer<DrawerScreenProps<RootDrawerParamList>>(({route, navigation}) => {
    useEffect(() => {
        fetchSourcesFromLocalStorage(coinFeedStore).then(_ => fetchSources(coinFeedStore));
    }, []);

    if (coinFeedStore.activeSource) {
        return (
            <CoinFeedStoreContext.Provider value={coinFeedStore}>
                <View style={styles.container}>
                    <SourceHeader navigation={navigation} route={route}></SourceHeader>
                    <SourceArticles></SourceArticles>
                    <SourceBuffet></SourceBuffet>
                </View>
            </CoinFeedStoreContext.Provider>
        );
    } else return <AppLoading></AppLoading>;
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.color.dark,
        alignItems: "center",
    },
});

export default Home;