import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import Home from "./components/screens/Home";
import Theme from "./modules/theme";
import CFDrawer from "./components/Drawer";
import Configure from "./components/screens/Configure";
import { StatusBar } from "expo-status-bar";

export type RootDrawerParamList = {
    Home: {};
    "Manage Sources": {};
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const App = observer(() => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                defaultStatus="closed"
                drawerContent={(props: any) => <CFDrawer {...props}></CFDrawer>}
                screenOptions={{
     