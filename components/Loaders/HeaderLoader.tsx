
import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { ViewProps } from "react-native"

const HeaderLoader = (props: ViewProps) => (
  <ContentLoader 
    speed={2}
    width={350}
    height={200}
    viewBox="0 0 350 200"
    backgroundColor="#292929"
    foregroundColor="#646464"
    {...props}
  >
    <Rect x="0" y="100" rx="0" ry="0" width="400" height="100" /> 
  </ContentLoader>
)

export default HeaderLoader