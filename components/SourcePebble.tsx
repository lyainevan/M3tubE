import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import { toSourceImageUrl } from "../modules/utils";
import { Source } from "./SourceBuffet";
import SourceImage from "./SourceImage";

con