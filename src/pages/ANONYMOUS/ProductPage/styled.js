import styled from "styled-components"

export const ProductPageStyle = styled.div`
  /* background-color: #fbedd7; */

  &_content {
    padding: 9rem 3rem 2rem;
    background-color: #fff;
  }

  .category-title {
    font-size: 3rem;
    font-weight: bold;
    color: var(--color-brown-dark);
  }

  .category-description {
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem 0 1rem;
    text-align: justify;
  }

  .title {
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--color-brown-dark);
    margin-top: 1rem;
  }

  .product-list {
    border-bottom: 1px solid #854c29;
    padding: 1rem 0 2rem;

    .swiper-slide {
      width: 30%;
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
      color: #fff;
    }
  }

  .category-list {
    padding: 3rem 3rem 5rem;
    .category-item {
      .wrap-img {
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
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--color-brown-dark);
        margin-top: 1rem;
        transition: all linear 0.3s;
        &:hover {
          color: #ea2c1e;
        }
      }
    }
  }
`
