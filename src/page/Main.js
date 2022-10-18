import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../component/Card";
import List from "../component/List";
import { __getNextTodo } from "../redux/todo";

const Main = () => {
  const dispatch = useDispatch();

  const { isNext, todos } = useSelector((state) => state.todo);

  const target = useRef(null);

  useEffect(() => {
    if (isNext) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          dispatch(__getNextTodo());
        }
      });

      observer.observe(target.current);

      return () => {
        observer.disconnect(observer);
      };
    }
  }, [dispatch, isNext]);

  return (
    <Container>
      <Link to={"/edit"}>등록하기</Link>
      {/* List 컴포넌트는 list를 map으로 단순히 그려주기 위한 컴포넌트 입니다.
          onReder함수를 통해 item, 즉 list의 요소를 받아오고 있고, 그 데이터를 활용해 Card 컴포넌트를 그려주고 있습니다. */}
      <List
        list={todos}
        onRender={(item) => <Card key={item.id} {...item} />}
      />
      <div ref={target} style={{ width: "100%", height: "1px" }} />
    </Container>
  );
};

export default Main;

const Container = styled.div``;
