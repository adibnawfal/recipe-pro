import React from "react";
import { View } from "react-native";
import { ShadowBox } from "react-native-neomorph-shadows";

import { wp, hp } from "../config/dimensions";
import { colors } from "../res/colors";

export default function SectionBreak() {
  return (
    <View style={{ height: hp(15), marginVertical: hp(25) }}>
      <View style={{ position: "absolute", left: wp(-27), right: wp(-27) }}>
        <ShadowBox
          inner
          useSvg
          style={{
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.3,
            shadowColor: colors.black,
            shadowRadius: 3,
            backgroundColor: colors.lightGrey,
            width: wp(360),
            height: hp(15),
          }}
        />
      </View>
    </View>
  );
}
