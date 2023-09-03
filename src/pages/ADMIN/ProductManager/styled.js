import styled from "styled-components"

export const ProductManagerStyle = styled.div`
  .wrap-left {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px 0;
    height: calc(100vh - 64px);

    .item-content {
      font-size: 14px;
      padding: 8px;
      display: block;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
      &.active {
        background-color: var(--color-primary);
        color: #fff;
      }
    }
  }
`
