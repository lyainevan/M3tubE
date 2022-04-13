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
                    >
                        <CFText type={CFTypography.H4}>
                            {activeSource?.website || ""}
                        </CFText>
                        <Feather
                            name="arrow-up-right"
                            size={14}
                            color={Theme.color.gray}
                        />
                    </Pressable>
                    <Divider
                        type={DividerType.THICK}
                        style={{ backgroundColor: activeSource.colorOne }}
                    ></Divider>
                </View>
            );
        } else return <HeaderLoader style={styles.container}></HeaderLoader>;
    }
);

const toUrl = (hostname: string) => concat("https://", hostname);

const styles = StyleSheet.create({
    headerRow: {
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
    },
    websiteRow: {
        justifyContent: "space-between",
        marginTop: Theme.spacing.small,
        marginBottom: 26,
    },
    container: {
        width: "100%",
        paddingLeft: Theme.spacing.medium,
        paddingRight: Theme.spacing.medium,
        paddingTop: 88,
    },
});

export default SourceHeader;
