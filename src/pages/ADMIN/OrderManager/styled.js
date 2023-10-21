import styled from "styled-components"

export const OrderManagerStyle = styled.div``

export const ModalDetailStyle = styled.div`
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    margin-top: 1rem;

    &.text-center {
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 2rem;
    }
  }

  .info-row {
    display: flex;

    .info-item {
      width: 50%;
    }
  }
  .info-item {
    margin: 8px 0;
    font-size: 14px;
  }
  .info-title {
    font-weight: bold;
  }
  .info-content {
    color: #595959;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background-color: #fff !important;
  }
  .info-update {
    min-height: 400px;

    .info-item {
      border-bottom: 1px solid #f0f0f0;
    }
  }
`
