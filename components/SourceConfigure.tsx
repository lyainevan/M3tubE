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
                    />
                    <SourceImage
                        item={item}
                        size={48}
                        style={{
                            marginEnd: Theme.spacing.medium,
                            marginStart: Theme.spacing.medium,
                        }}
                    ></SourceImage>
                    <CFText
                        style={
                            coinFeedStore.isSourceActive(item)
                                ? {}
                                : { color: Theme.color.gray }
                        }
                    >
                        {item.name}
                    </CFText>
                </View>
                <Pressable
                    style={styles.listItemRight}
                    onPress={() => {
                        impactAsync(ImpactFeedbackStyle.Light);
                        coinFeedStore.toggleSourceActivation(item);
                    }}
                >
                    {coinFeedStore.isSourceActive(item) ? (
                        <MaterialCommunityIcons
                            name="minus-circle-outline"
                            size={24}
                            color={Theme.color.gray}
                        />
                    ) : (
                        <MaterialIcons
                            name="add-circle-outline"
                            size={24}
                            color={Theme.color.base}
                        />
                    )}
                </Pressable>
            </Pressable>
        );
    }
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: Theme.spacing.medium,
        paddingBottom: Theme.spacing.medium,
        justifyContent: "flex-start",
    },
    listItemRight: {
        justifyContent: "center",
    },
});

export default SourceConfigure;
