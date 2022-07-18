import { formatDistanceToNow } from "date-fns";
import {
    compose,
    join,
    append,
    split,
    toLower,
    concat,
    __,
    map,
    assoc,
    lensProp,
    view,
} from "ramda";
import { Source } from "../components/SourceBuffet";
import { CoinFeedStore } from "./CoinFeedStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    ARTICLE