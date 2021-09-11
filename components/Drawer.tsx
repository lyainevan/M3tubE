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
            style={styles.drawerHeader}
        ></Image>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>
);

const styles = StyleSheet.create({
    drawerHeader: {
        height: 100,
        width: 87.3,
        alignSelf: "center",
        marginBottom: Theme.spacing.large,
        marginTop: Theme.spacing.small
    }
})

export default CFDrawer;
