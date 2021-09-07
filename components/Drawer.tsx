import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { Image, StyleSheet } from "react-native";
import Theme from "../modules/theme";

const CFDrawer = (props: any) => (
    <DrawerContentScrollView {...props}>
        <Image
            progressiveRenderingEnabled
            source={require("../assets/icon.png")}
            style={styles.drawerH