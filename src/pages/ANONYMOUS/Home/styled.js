import styled from "styled-components"
import { Col } from "antd"

export const HomeStyled = styled.div``
export const ContentStyleAnimation = styled(Col)`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0px !important;
  margin-top: 10px;
  text-shadow: 0 1px #999;
  animation: BoxAnimate ${props => 1 + props.order * 0.3}s linear;
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: center;
  }

  @media only screen and (min-width: 1200px) {
    margin-left: 0px !important;
    /* margin-top: 40px; */
  }
  .option-box {
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    @media only screen and (min-width: 1200px) {
      font-size: 22px;
    }
  }
  @keyframes BoxAnimate {
    0%,
    60% {
      margin-left: 100px;
      opacity: 0;
    }

    100% {
      margin-left: 0px;
      opacity: 1;
    }
  }
`
export const TabsNewsStyled = styled.div`
  .hover-red {
    :hover {
      color: #f0383e;
    }
  }
  .ant-tabs-content-holder {
    padding: 0px 0px;
  }
  .bread-crumb-tab-news {
    margin-top: 0px;
    margin-bottom: 15px;
    .ant-breadcrumb-link,
    .ant-breadcrumb-separator {
      color: #212529;
      font-weight: 400;
      opacity: 1;
      font-size: 14px;
    }
  }
  .see-more-2 {
    position: absolute;
    top: -50px;
    right: 0px;
    cursor: pointer;
  }

  .see-more-3 {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  .see-more {
    position: absolute;
    top: 20px;
    right: 0px;
    cursor: pointer;
  }
  .ant-tabs-tab-active {
    background: #f8f8f8;
  }
  .ant-tabs-tab {
    padding: 15px 25px;
    margin: 0px;
  }
  .ant-tabs-tab-btn {
    font-weight: 600;
    font-size: 15px;
    line-height: 120%;
    text-align: center;
    text-shadow: unset !important;
    color: #154398;
    @media only screen and (min-width: 600px) {
      font-size: 22px;
    }
    @media only screen and (min-width: 550px) {
      font-size: 18px;
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ee1d23;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: linear-gradient(90deg, #154297 0%, #ed1e24 100%);
  }
`
