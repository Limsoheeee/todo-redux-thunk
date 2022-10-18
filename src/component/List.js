import styled from "styled-components";

const List = (props) => {
  const { list, onRender } = props;

  return <Container>{list.map((item) => onRender(item))}</Container>;
};

export default List;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  list-style: none;
  padding: 0;
`;
