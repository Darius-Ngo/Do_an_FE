import styled from "styled-components"

export const StyleLoginPage = styled.div`
  min-height: calc(100vh - 155px);
  display: flex;
  justify-content: center;
  .content-wrap {
    margin-top: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.1);
    padding: 24px;
    width: 1000px;
    height: fit-content;
  }
  .btn-login {
    width: 100%;
  }
  .title-form {
    text-transform: uppercase;
    color: ${({ theme }) => theme["primary-color"]};
  }
  .border-right-form {
    border-right: 2px solid ${({ theme }) => theme["primary-color"]};
  }
`
