import styled from "styled-components"

export const MenuPageStyle = styled.div`
  // background-color: #fbedd7;
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 16px 3rem 2rem;

  .search-box {
    position: absolute;
    top: 0;
    right: 140px;
  }
  .category-row {
    margin-bottom: 20px;
    & .category-title {
      font-size: 30px;
      font-weight: bold;
      color: var(--color-brown-dark);
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

    .product-list {
    }
  }
`
