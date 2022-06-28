
import { autorun, makeAutoObservable } from "mobx";
import {
    always,
    compose,
    concat,
    differenceWith,
    ifElse,
    lensProp,
    not,
    view,
    __,
    has,
    equals,
    filter,
    map,
} from "ramda";
import { createContext } from "react";
import { CFArticle } from "../components/Article";