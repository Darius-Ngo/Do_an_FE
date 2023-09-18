import styled from "styled-components"

export const ProductCardStyle = styled.div`
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
    color: var(--color-brown-dark);
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
    color: var(--color-brown-dark);
    span {
      font-weight: bold;
    }
  }
`
