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

  useEffect(() => {
    dispatch(__getTodoList());
  }, [dispatch]);

  return (
    <Container>
      <Link to={"/edit"}>등록하기</Link>
      <List
        list={todoList}
        onRender={(item) => <Card key={item.id} {...item} />}
      />
    </Container>
  );
};

export default Main;

const Container = styled.div``;
