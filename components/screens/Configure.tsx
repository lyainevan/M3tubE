import { StyleSheet, View } from "react-native";
import Theme from "../../modules/theme";
import DraggableFlatList from "react-native-draggable-flatlist";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { CoinFeedStoreContext } from "../../modules/CoinFeedStore";
import SourceConfigure from "../SourceConfigure";
import Divider, { DividerType } from "../Divider";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";
import Header from "../Header";

const Configure = observer<DrawerScreenProps<RootDrawerParamList>>(
    ({ route, navigation }) => {
        const { sources, replaceSources } = useContext(CoinFeedStoreContext);

        return (
            <View style={styles.container}>
                <Header
                    primaryText="Manage Sources"
                    secondaryText="Drag and drop to rearrange sources."
                    navigation={navigation}
                    route={route}
                ></Header>
                <DraggableFlatList
                    data={sources}
                    renderItem={(prop) => (
                        <SourceConfigure {...prop}></SourceConfigure>
                    )}
                    keyExtractor={({ name }) => name}
                    onDragEnd={({ data }) => replaceSources(data)}
                    ItemSeparatorComponent={() => (
                        <Divider ty