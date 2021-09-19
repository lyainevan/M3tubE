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