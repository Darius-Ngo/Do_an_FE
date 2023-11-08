import styled from "styled-components"

export const ViewPDFStyle = styled.div`
  .pdf-container {
    height: auto !important;
    border: none;
  }
  .ant-modal-body {
    padding: 0;
    overflow: hidden hidden;
  }
  .ant-modal-header {
    &::after {
      content: unset;
    }
  }
  .pdf-container {
    height: calc(100vh - 20px);
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .rpv-default-layout__toolbar {
      position: sticky;
      top: 0;
    }
  }
`
export const NewsDetailStyled = styled.div`
  /* img {
    width: 600px;
  } */
  .new-detail-header {
    font-weight: 600;
    font-size: 24px;
    line-height: 120%;
    color: var(--color-brown);
    margin: 0px 0px 16px;
  }
  ._51m-,
  ._2pir,
  ._51mw {
    display: none;
  }

  .button-back {
    display: flex;
    font-weight: 600;
    font-size: 14px;
    color: #154398;
    margin-bottom: 25px;
    cursor: pointer;
  }

  .new-detail-sub-header {
  }
  .new-detail-sub-text {
    font-size: 12px;
    color: #838383;
  }
  .share-face {
    :hover {
      span {
        text-decoration: underline;
      }
    }
    padding: 0 5px;
    span {
      font-size: 12px;
      color: #838383;
      svg {
        width: 16px !important;
        height: 16px !important;
      }
    }
  }
  .fb_iframe_widget {
    width: 111px;
    overflow: hidden;
  }
  .new-detail-content {
    font-style: italic;
    font-weight: 600;
    margin-top: 30px;
    /* margin: 0 32px; */
    /* border-left: 4px solid #fff501; */
    /* padding-left: 20px; */
    font-size: 14px;
    line-height: 200%;
    color: #000000;
  }
  .news-detail-box-tags {
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 10px 8px;
    font-size: 10px;
    color: #000000;
  }

  .news-detail-box-action {
    display: flex;
    align-items: center;
  }
  .rotage180 {
    transform: rotate(180deg);
  }

  img {
    max-width: 100% !important;
    height: auto !important;
    object-fit: cover;
  }
`

export const TabsNewsStyled = styled.div`
  margin-top: 24px;
  .ant-tabs-content-holder {
    padding: 20px 0px;
  }
  .bread-crumb-tab-news {
    margin-top: -15px;
    margin-bottom: 15px;
    .ant-breadcrumb-link,
    .ant-breadcrumb-separator {
      color: #212529;
      font-weight: 400;
      opacity: 1;
      font-size: 14px;
    }
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
  .ant-tabs-tab-active::after {
    content: "";
    width: 80px;
    height: 4px;
    background-image: -webkit-linear-gradient(
      0deg,
      rgb(21, 67, 152) 0%,
      rgb(238, 29, 35) 100%
    );
    position: absolute;
    left: 40px;
    bottom: -2px;
    margin: 0 0 0 -40px;
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
    height: 3px;
    background: linear-gradient(90deg, #154297 0%, #ed1e24 100%);
  }
`

export const PopoverWrapper = styled.div`
  .popover-option {
    :hover {
      cursor: pointer;
      background: #e3f3fe;
    }
  }
`

export const CommentWrapper = styled.div`
  .expand-hover:hover {
    font-weight: 600;
  }
  .expand-div-comment {
    /* position: relative;
    :after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%; */
    /* background: linear-gradient(to top, #093a6399, #006cbb00, #004e9c00); */
    /* } */
  }
  .ant-tabs-content-holder {
    padding: 0px;
  }
  .content-comment-expand {
    color: #038cf5;
    font-weight: 600;
  }
  .ant-row {
    flex-flow: unset;
  }

  .social-option {
    display: flex;
    align-items: center;
    margin: 16px 0;
  }

  .mb-24 {
    margin: 0 24px !important;
  }

  .border-bottom-1 {
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .time-comment {
    font-weight: 400;
    font-size: 12px;
    color: #666666;
    margin: 4px 0 8px;
  }

  .username {
    font-weight: 400;
    font-size: 12px;
    color: #000000;
  }

  .my-comment {
    display: flex;
    align-items: center;
    margin-top: 24px;

    .ant-input {
      margin-left: 10px;
    }
  }

  .see-more {
    border-left: 1px solid #dddddd;
    padding-left: 16px;
  }

  .reply-comment {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .ant-input {
      margin-left: 16px;
    }
  }

  .comment-header {
    font-weight: 600;
    font-size: 20px;
  }
`
