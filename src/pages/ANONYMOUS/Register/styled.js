import styled from "styled-components"
export const RegisterStyle = styled.div`
  min-height: calc(100vh - 155px);
  display: flex;
  justify-content: center;
  .content-wrap {
    margin-top: 16px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.1);
    padding: 24px;
    width: 1000px;
    height: fit-content;
  }
  .title-form {
    text-transform: uppercase;
    color: ${({ theme }) => theme["primary-color"]};
  }
  .btn-register {
    width: 120px;
  }
  .ant-upload.ant-upload-drag {
    border: 1px solid #ddd;
    .ant-upload-btn {
      background: #fff;
      padding: 6px 0;
      color: #888;
    }
  }
`
