
import { StyleSheet, View, ViewProps } from "react-native";
import Theme from "../modules/theme";

export enum DividerType {
    THICK = 4,
    THIN = 1,
}

const Divider = ({
    type,
    ...props
}: { type: DividerType } & Partial<ViewProps>) => {
    return (
        <View
            style={StyleSheet.flatten([
                {
                    height: type,
                    backgroundColor:
                        type === DividerType.THIN
                            ? Theme.color.gray
                            : Theme.color.base,
                },
                props?.style,
            ])}
        ></View>
    );
};

export default Divider;