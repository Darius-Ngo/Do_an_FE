import styled from "styled-components"

export const CartPageStyle = styled.div`
  .cart-page-container {
    width: 100%;
    min-height: 100vh;
    padding: 7rem 3rem 2rem;

    .cart-header {
      padding: 1rem 2rem;
      background-color: #fff;
      width: 100%;
      border-radius: 4px;
      margin-bottom: 1rem;
      .header-content {
        font-size: 14px;
        font-weight: 600;
      }
    }
    .cart-content {
      background-color: #fff;
      border-radius: 4px;
      margin-bottom: 1rem;
      width: 100%;
      .product-item {
        padding: 1rem 2rem;
        border-bottom: 1px solid #ddd;
        .product-img-name {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: var(--color-brown-dark);
          &:hover {
            color: #820014;
          }
          .product-img {
            height: 50px;
            width: 50px;
            object-fit: cover;
            margin-right: 12px;
          }
          .product-name {
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            overflow: hidden;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .product-item__content {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          font-size: 14px;
          font-weight: 600;
        }
        .sum-price {
          font-weight: bold;
          color: #871400;
        }
        .product-delete {
          height: 100%;
          svg {
            font-size: 40px;
            cursor: pointer;
            color: #333;
            padding: 4px;
            transition: all 0.3s;
            &:hover {
              color: #cf1322;
            }
          }
        }
      }
    }

    .cart-order {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      padding: 1rem 2rem;

      .sum-bill {
        display: flex;
        align-items: center;
        justify-content: center;
        .title,
        .bill {
          font-size: 1.5em;
          font-weight: 500;
        }
        .bill {
          margin-left: 8px;
          font-weight: 600;
          color: #873800;
        }
      }
      .btn-buy {
        margin-left: 3rem;
        color: #fff;
        background-color: #d4380d;
        font-size: 1rem;
        font-weight: bold;
        padding: 12px 20px;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .location-info {
      padding: 1rem 2rem;
      background-color: #fff;
      width: 100%;
      border-radius: 4px;
      margin-bottom: 1rem;
      &__title {
        font-size: 18px;
        color: #ee4d2d;
        font-weight: 600;
        margin-bottom: 20px;
      }
      &__detail {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 16px;
        &-name {
          & > * {
            margin-right: 8px;
          }
        }
        &-content {
          flex: 1;
          margin-left: 1rem;
        }
        &-change {
          font-size: 16px;
          font-weight: 600;
          color: #05a;
          cursor: pointer;
        }
      }
    }

    .shipper-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 1rem 2rem;
      background-color: #fff;
      width: 100%;
      border-radius: 4px;
      margin-bottom: 1rem;
      font-size: 16px;

      .shipper-icon {
        color: #00bfa5;
        margin-right: 8px;
        svg {
          font-size: 24px;
        }
      }
      .shipper-content {
        flex: 1;
        strong {
          margin-left: 6px;
        }
      }
      .btn-detail {
        font-weight: 600;
        color: #05a;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`
