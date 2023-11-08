import styled from "styled-components"

export const CommentWrapper = styled.div`
  .expand-hover:hover {
    font-weight: 600;
  }
  .comment-edit {
    padding: 8px;
    :hover {
      background: #dddddd;
      border-radius: 100%;
    }
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
    margin: 24px 0px;

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

export const PopoverWrapper = styled.div`
  .popover-option {
    padding: 4px;
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background: #e3f3fe;
    }
  }
`
