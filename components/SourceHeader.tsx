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
import { Feather } from "@expo/vector-icons