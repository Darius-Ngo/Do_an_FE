import { Badge } from "antd"
import React from "react"
import { checkNews } from "src/lib/time"
import styled from "styled-components"
const NewsBadgeStyle = styled.div`
  .not-conner {
    .ant-ribbon-corner {
      display: none;
    }
  }
`
const NewsBadge = props => {
  const { children } = props
  return (
    <NewsBadgeStyle {...props}>
      {!!checkNews(props?.time) ? (
        <Badge.Ribbon
          placement={props?.placement || "end"}
          text="Tin mới"
          color="red"
          style={props?.styleBad}
          className={props?.classNameBad}
        >
          {children}
        </Badge.Ribbon>
      ) : (
        <>{children}</>
      )}
    </NewsBadgeStyle>
  )
}

export default NewsBadge
