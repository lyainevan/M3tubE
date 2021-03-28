import { observer } from "mobx-react-lite";
import { Pressable, StyleSheet, View, Share } from "react-native";
import CFText, { CFTypography } from "./CFText";
import * as WebBrowser from "expo-web-browser";
import Theme from "../modules/theme";
import { useContext } from "react";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import { toRelativeTime } from "../