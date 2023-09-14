import styled from "styled-components"

export const ProductDetailStyle = styled.div`
  background-color: #fff;
  padding: 20px 0;

  &_content {
    padding: 9rem 9rem 2rem;
    background-color: #fff;
  }
  .product-detail-title {
    font-size: 24px;
    font-weight: bold;
    color: #612500;
  }
  .product-description {
    font-size: 16px;
    font-weight: 500;
    padding: 0.5rem 0 1rem;
    text-align: justify;
    line-height: 1.5;
  }
  /* .row-content {
    display: flex;
    align-items: flex-start;
    border-bottom: 2px solid #ddd;
    padding-bottom: 2rem; */

  & .wrap-img {
    border: 1px solid #ddd;
    width: 100%;
    img {
      width: 100%;
    }
  }
  & .wrap-content {
    width: 70%;
    margin: 0;
    padding: 0 1rem;

    .btn-order {
      background-color: #cf1322;
      color: #fff;
      text-align: center;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 8px;
      padding: 13px 70px;
      margin-top: 24px;
      width: fit-content;
      box-shadow: 6px 10px 16px 6px rgb(0 0 0 / 20%);
      cursor: pointer;
    }

    .product-option {
      .title-item {
        margin-right: 10px;
        font-size: 14px;
        font-weight: 600;
        width: 80px;
        color: var(--color-header);
      }
      .option-size {
        display: flex;
        align-items: center;
        .ant-radio-button-wrapper {
          margin-right: 8px;
          font-weight: 600;
          height: 40px;
          font-size: 16px;
          line-height: 37px;

          &:focus-within {
            box-shadow: unset;
            border: 1px solid #b22830;
            background-color: #b22830;
            color: #fff;
            &::before {
              width: 0;
            }
          }
          &:hover {
            color: #b22830;
          }
        }
        .ant-radio-button-wrapper-checked:not(
            .ant-radio-button-wrapper-disabled
          ) {
          /* color: #b22830; */
          border: 1px solid #b22830;
          background-color: #b22830;
          color: #fff;
        }
      }
      .product-price {
        display: flex;
        align-items: center;
        margin: 1rem 0;
        font-size: 22px;
        color: #e4b95b;
      }
      .change-quality {
        display: flex;
        align-items: center;
        border: 1px solid #ddd;
        .input-change {
          border-radius: 0;
          border: 0;
          box-shadow: none;
          width: 45px !important;
          .ant-input-number-handler-wrap {
            display: none;
          }
        }
        .btn-change {
          height: 38px;
          width: 28px;
          font-size: 20px;
          border: 0;
          cursor: pointer;
          &:hover {
            background-color: #d9d9d9;
          }
        }
        .btn-change:disabled {
          cursor: not-allowed;
          background-color: #f5f5f5;
          color: #999;
        }
      }
    }
  }

  .list-product {
    margin-top: 40px;
    width: 100%;
    background: #f5f2eb;
    padding-top: 35px;
    .heading {
      text-transform: uppercase;
      font-size: 24px;
      font-weight: 700;
      color: #e7b45a;
      text-align: center;
      margin-bottom: 40px;
    }
    .product-name {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-header);
      &:hover {
        cursor: pointer;
        color: #e7b45a;
      }
    }
    .line {
      flex: 1;
      border-bottom: 1px dashed var(--color-header);
    }
    .product-price {
      color: var(--color-header);
      font-size: 16px;
      font-weight: 600;
    }
    .product-description {
      margin-top: 4px;
      height: 30px;
      color: #555;
    }
  }

  /* } */
  .product-item {
    text-align: center;

    .wrap-img {
      padding: 2rem;
      border: 1px solid #ddd;
      overflow: hidden;
      & img {
        transform: scale(1);
        transition: all linear 0.3s;
      }
      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
    .product-name {
      font-size: 1.2rem;
      font-weight: bold;
      color: #612500;
      margin: 1rem 0 0.5rem;
      cursor: pointer;
      transition: all linear 0.3s;
      &:hover {
        color: #ea2c1e;
      }
    }
    .product-price {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #612500;
      span {
        font-weight: bold;
      }
    }
  }
`
export const TabsStyled = styled.div`
  @media (max-width: 450px) {
    .ant-tabs.ant-tabs-top.ant-tabs-mobile.rating-row {
      width: 60% !important;
    }

    .description-product {
      img {
        height: 178px;
      }
    }
  }
  @media (max-width: 390px) {
    .description-product {
      img {
        height: 178px;
      }
    }
  }

  .hover-red {
    :hover {
      color: var(--color-header);
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
      color: var(--color-header);
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
    font-size: 18px;
    line-height: 120%;
    text-align: center;
    text-shadow: unset !important;
    color: var(--color-header);
    @media only screen and (min-width: 600px) {
      font-size: 22px;
    }
    @media only screen and (min-width: 550px) {
      font-size: 18px;
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #bc956c;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: linear-gradient(90deg, #bc956c 0%, var(--color-header) 100%);
  }
`
