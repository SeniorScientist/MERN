import styled from "@emotion/styled";

export const Container = styled.div<{ pathname: string }>`
  height: 100vh;
  width: 100vw;
  position: relative;
  background: rgb(36, 5, 57);
  background: linear-gradient(
    180deg,
    rgba(36, 5, 57, 1) 0%,
    rgba(9, 96, 121, 1) 43%,
    rgba(0, 255, 214, 1) 100%
  );

  section {
    position: absolute;
    top: 0;
    ${(props) => (props.pathname === "/login" ? "right: 0;" : "left: 0;")}
    ${(props) =>
      props.pathname === "/login"
        ? "border-radius: 1rem 0 0 1rem;"
        : "border-radius: 0 1rem 1rem 0;"}
    width: 50%;
    z-index: 1;
    height: 100%;
    background: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 2rem;
      text-align: center;
      margin: 2rem 0 0.5rem 0;
    }

    h2 {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }

  & section.slide-to-left {
    left: 0;
    right: 50%;
    border-radius: 0 1rem 1rem 0;
  }

  & section.slide-to-right {
    left: 50%;
    right: 0;
    border-radius: 1rem 0 0 1rem;
  }

  & section.slide-to-left {
    animation: slide-to-left 600ms cubic-bezier(0.57, 0.13, 0.58, 0.91);
  }

  & section.slide-to-right {
    animation: slide-to-right 600ms cubic-bezier(0.57, 0.13, 0.58, 0.91);
  }

  @keyframes slide-to-left {
    0% {
      left: 50%;
      right: 0;
    }
    100% {
      left: 0;
      right: 50%;
    }
  }

  @keyframes slide-to-right {
    0% {
      left: 0;
      right: 50%;
    }
    100% {
      left: 50%;
      right: 0;
    }
  }
`;