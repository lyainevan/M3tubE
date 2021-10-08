import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { RootDrawerParamList } from "../App";
import Theme from "../modules/theme";
import CFText, { CFTypography } from "./CFText";
import Divider, { DividerType } from "./Divider";
import { Feather } from "@expo/vector-icons";

const Header = ({
    navigation,
    primaryText,
    secondaryText,
}: DrawerScreenProps<RootDrawerParamList> & {
    primaryText: string;
    secondaryText?: string;
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Pressable
                    onPress={navigation.openDrawer}
                    hitSlop={20}
                    style={{ paddingEnd: Theme.spacing.small }}
                >
                    <Feather name="menu" size={30} color="white" />
                </Pressable>
                <CFText type={CFTypography.H1}>{primaryText}</CFText>
            </View>
            <View
                style={StyleSheet.flatten([
                    styles.headerRow,
                    styles.websiteRow,
                ])}
            >
                <CFText type={CFTypography.H4}>{secondaryText || ""}</CFText>
            </View>
            <Divider type={DividerType.THICK}></Divider>
        </View>
    );
};

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
        paddingTop: 88,
    },
});

export default Header;
