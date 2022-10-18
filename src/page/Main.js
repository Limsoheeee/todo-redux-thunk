import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../component/Card";
import List from "../component/List";
import { __getTodoList } from "../redux/todo";

const Main = () => {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todo.todos);

  // 메인페이지 진입시 서버에서 todoList를 가져와 리덕스를 업데이트 합니다.
  useEffect(() => {
    dispatch(__getTodoList());
  }, [dispatch]);

  return (
    <Container>
      <Link to={"/edit"}>등록하기</Link>
      {/* List 컴포넌트는 list를 map으로 단순히 그려주기 위한 컴포넌트 입니다.
          onReder함수를 통해 item, 즉 list의 요소를 받아오고 있고, 그 데이터를 활용해 Card 컴포넌트를 그려주고 있습니다. */}
      <List
        list={todoList}
        onRender={(item) => <Card key={item.id} {...item} />}
      />
    </Container>
  );
};

export default Main;

const Container = styled.div``;
