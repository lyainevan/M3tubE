import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Animated } from "react-native";
import {
    CoinFeedStoreContext,
    VerticalScrollDirection,
} from "../modules/CoinFeedStore";
import Theme from "../modules/theme";
import SourcePebble from "./SourcePebble";
import SourceLoader from "./loaders/SourceLoader";

export interface Source {
    name: string;
    feedUrl: string;
    website: string;
    colorOne: string;
    colorTwo: string;