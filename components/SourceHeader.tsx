import { observer } from "mobx-react-lite";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import CFText, { CFTypography } from "./CFText";
import Theme from "../modules/theme";
import Divider, { DividerType } from "./Divider";
import { concat } from "ramda";
import * as WebBrowser from "expo-web-browser";
import HeaderLoader from "./loaders/HeaderLoader";
import { Feather } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../App";

const SourceHeader = observer<DrawerScreenProps<RootDrawerParamList>>(
    ({ navigation, route }) => {
        const { activeSource } = useContext(CoinFeedStoreContext);
        const handlePress = () =>
            WebBrowser.openBrowserAsync(toUrl(activeSource?.website || ""));
        if (activeSource) {
            return (
                <View style={styles.container}>
                    <View style={styles.headerRow}>
                        <Pressable
                            onPress={navigation.openDrawer}
                            hitSlop={20}
                            style={{ paddingEnd: 8 }}
                        >
                            <Feather name="menu" size={30} color="white" />
                        </Pressable>
                        <CFText type={CFTypography.H1}>
                            {activeSource?.name || ""}
                        </CFText>
                    </View>
                    <Pressable
                        onPress={handlePress}
                        style={StyleSheet.flatten([
                            styles.headerRow,
                            styles.websiteRow,
                        ])}
          