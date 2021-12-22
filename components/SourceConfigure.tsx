import { Pressable, View, StyleSheet } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import Theme from "../modules/theme";
import CFText from "./CFText";
import { Source } from "./SourceBuffet";
import SourceImage from "./SourceImage";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import React, { useContext } from "react";