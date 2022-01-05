import { Pressable, View, StyleSheet } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import Theme from "../modules/theme";
import CFText from "./CFText";
import { Source } from "./SourceBuffet";
import SourceImage from "./SourceImage";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";

const SourceConfigure = observer(
    ({ item, isActive, drag }: RenderItemParams<Source>) => {
        const coinFeedStore = useContext(CoinFeedStoreContext);
        return (
            <Pressable
                onLongPress={() => {
                    drag();
                    impactAsync(ImpactFeedbackStyle.Light);
                }}
                disabled={isActive}
                style={styles.listItem}
            >
                <View style={styles.listItemLeft}>
                    <MaterialCommunityIcons
                        name="drag-horizontal-variant"
                        size={30}
                        color={Theme.color.gray}
    