import styled from "styled-components"

export const StatisticStyle = styled.div`
  .button-show-more {
    cursor: pointer;
    text-align: center;
    color: #1574f6;
    font-family: Noto Sans;
    font-size: 17px;
    font-style: italic;
    font-weight: 400;
    line-height: 16.846px;
  }
  .ant-select-selector {
    height: 100% !important;
  }
  .box-white {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
  }
  .box-border {
    padding-top: 16px;
    padding-bottom: 16px;
    /* padding-left: 0px;
    padding-right: 0px; */
    border-radius: 8px;
    /* border: 1px solid #cccccc; */
    /* padding: 16px; */
    margin-bottom: 16px;
    box-shadow: rgba(21, 67, 152, 0.1) 0px 0px 20px;
  }
  .quality-item-box {
    border: 2px solid #0d9d57;
    border-radius: 8px;
    height: 80px;
    padding: 10px;
    .quality-item-number {
      color: #0d9d57;
      font-weight: 600;
      text-align: center;
      font-size: 24px;
      margin-bottom: 8px;
    }
    .quality-item-content {
      color: #868e96;
      text-align: center;
      text-transform: uppercase;
      line-height: 1.5;
      /* font-size: 14px; */
    }
  }
  .general-infor {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 52px;
    height: 204px;
    .general-infor-item {
      border-radius: 8px;
      padding: 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      height: 100%;
      width: 400px;
      .header-text {
        font-size: 20px;
        font-weight: bold;
      }
      .mb-text {
        margin-bottom: 8px;
      }
    }
    .general-infor-green {
      background: #c0e5ce;
      .number-color {
        color: #0d9d57;
        font-weight: 600;
        font-size: 30px;
      }
    }
    .general-infor-orange {
      background: #ffe0b2;
      .number-color {
        color: #ff6f00;
        font-weight: 600;
        font-size: 30px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .general-infor-red {
      background: #ffcdd2;
      .number-color {
        color: #ce3135;
        font-weight: 600;
        font-size: 30px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .general-infor-blue {
      background: #cdfff9;
      .number-color {
        color: #ce3135;
        font-weight: 600;
        font-size: 30px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`
export const StatisticItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: rgba(21, 67, 152, 0.1) 0px 0px 20px;
  padding: 8px 12px;
  border-radius: 8px;
  height: 100%;
  .statistic-icon {
    svg {
      width: 40px;
      height: 40px;
      path {
        /* fill: ${props => props.color}; */
      }
    }
    .icon-2,
    .icon-3 {
      path {
        fill: ${props => props.color};
      }
    }
    .icon-1,
    .icon-4,
    .icon-5 {
      path,
      circle {
        stroke: ${props => props.color};
      }
    }
  }
  .title-item {
    font-size: 15px;
    /* color: ${props => props.color}; */
    margin-bottom: 8px;
    white-space: nowrap;
  }
  .value-item {
    font-size: 15px;
    font-weight: 600;
    color: #555;
  }
`
