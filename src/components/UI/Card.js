import styled from "@emotion/styled";

const CardContainer = styled.div`
  padding: 0 0 1rem 0;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: white;
  width: 100%;
  max-width: 15rem;
`;

const Card = (props) => {
  return <CardContainer>{props.children}</CardContainer>;
};

export default Card;
