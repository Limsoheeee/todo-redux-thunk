import styled from "styled-components";

/**
 * 단순하게 list를 map으로 그려주는 컴포넌트
 * onRender 함수를 통해 생성 컴포넌트를 지정할 수 있습니다.
 */
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
