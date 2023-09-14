import styled from "styled-components"

export const MenuPageStyle = styled.div`
  // background-color: #fbedd7;
  width: 100%;
  min-height: 100vh;
  padding: 7rem 3rem 2rem;
  .category-row {
    & .category-title {
      font-size: 3rem;
      font-weight: bold;
      color: #612500;
    }
    .category-img {
      cursor: pointer;
      overflow: hidden;
      img {
        transition: all linear 0.3s;
      }
      &:hover {
        img {
          transform: scale(1.01);
        }
      }
    }

    & .category-description {
      font-size: 14px;
      font-weight: 500;
      padding: 0.5rem 0 1rem;
      text-align: justify;
    }

    .btn-show-product {
      font-size: 1rem;
      font-weight: 500;
      background-color: transparent;
      padding: 0.5rem 3rem;
      margin-bottom: 1rem;
      color: #ad4e00;
      border: 1px solid #ad4e00;
      border-radius: 6px;
      transition: all ease 0.4s;
      cursor: pointer;
      &:hover {
        background-color: #820014;
        color: #fff;
      }
    }

    .box-product {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4rem;
      margin-left: 16px;
      .wrap-img {
        width: 100px;
        transition: all 0.3s;
      }
      .product-info {
        width: 70%;
        &_name {
          font-size: 1.2rem;
          font-weight: bold;
          color: #612500;
          margin-bottom: 12px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          overflow: hidden;
          transition: all 0.3s;
          &:hover {
            color: #cf1322;
          }
        }
        &_description {
          text-align: justify;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          display: -webkit-box;
          overflow: hidden;
        }
      }

      &:hover {
        cursor: pointer;
        * {
          color: #cf1322;
        }
        .wrap-img {
          transform: scale(1.1);
        }
      }
    }
  }
`
