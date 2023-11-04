import styled from "styled-components"

export const PostPageStyle = styled.div`
  padding: 16px 0;
  .title-page {
    font-size: 24px;
    padding-bottom: 8px;
    color: var(--color-brown);
    border-bottom: 1px solid var(--color-yellow);
  }
  .post-content {
  }
`

export const NewsItemStyled = styled.div`
  cursor: pointer;
  .bd-post-one {
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 24px;
  }
  .bd-post-one1 {
    border-bottom: 1px solid #d9d9d9;
    margin-bottom: 24px;
  }
  .bd-post-right {
    border-right: 1px solid #d9d9d9;
    padding-bottom: 24px;
  }
  .div-sca {
    overflow: hidden;
  }
  .sca {
    transition: 1s all ease-out;
    :hover {
      transform: scale(1.2);
    }
  }
  .hover-red {
    font-size: 16px !important;
    :hover {
      color: #e4353a;
    }
  }

  .div-logo-product2 {
    max-width: 60vh !important;
    height: 30vh !important;
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-radius: 100%; */
    overflow-y: hidden;
    position: relative;

    :hover {
      img {
        transform: scale(1.2);
      }
    }
    img {
      /* height: 90%; */
      width: 100%;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      transition: all 3s ease-in-out;

      /* animation: mymove 2s linear 0s alternate; */
    }
    @keyframes mymove {
      from {
        top: 0;
      }
      to {
        top: unset;
        bottom: 0;
      }
    }
  }
  .div-logo-product {
    max-width: 60vh !important;
    min-width: 60vh !important;
    height: 30vh !important;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-radius: 100%; */
    overflow-y: hidden;
    position: relative;

    :hover {
      img {
        transform: translateY(calc((-100% + 30vh)));
      }
      .div-hover {
        display: flex;
      }
    }
    .div-hover {
      display: none;
      justify-content: center;
      align-items: center;
      transition: all 2s ease-in-out;
      background: linear-gradient(to top, #00577f8f, rgba(255, 255, 255, 0));
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .ant-btn {
        margin-left: 8px;
        margin-right: 8px;
        font-weight: 600;
        min-width: 150px;
        padding: 10px 20px;
        border-radius: 20px !important;
      }
      .btn-see {
        :hover {
          background: #154398 !important;
          div div span {
            color: #fff !important;
          }
        }
      }
      .btn-detail {
        :hover {
          background: #e50500 !important;
          div div span {
            color: #fff !important;
          }
        }
      }
    }
    img {
      /* height: 90%; */
      width: 100%;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      transition: all 3s ease-in-out;

      /* animation: mymove 2s linear 0s alternate; */
    }
    @keyframes mymove {
      from {
        top: 0;
      }
      to {
        top: unset;
        bottom: 0;
      }
    }
  }
  .ispreview {
    cursor: pointer;
    color: #1890ff;
    font-style: italic;
    :hover {
      text-decoration: underline;
      font-weight: 600;
    }
  }
  .news-image {
    overflow: hidden;
  }
  .box-shadow-maintoring {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .news-image:hover {
    .image {
      transform: scale(1.2);
    }
  }
  .image {
    transition: all 1s;
    transform: scale(1);
  }
  .main-header {
    font-size: 20px;
    font-weight: 600;
    overflow: hidden;
    :hover {
      color: #e4353a;
    }
  }
  .ellipsis-5 {
    -webkit-line-clamp: 5 !important;
  }
  .time {
    font-size: 12px;
    color: #838383;
  }
  .mv-17 {
    margin: 17px 0px !important;
  }
  .content {
    color: #838383;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .type-new {
    font-weight: 600;
    color: #f0383e;
  }
  .header-small {
    color: #154398;
    font-weight: 600;
    font-size: 16px;
    margin: 8px 0px;
  }
`
