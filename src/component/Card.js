import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __delTodo } from "../redux/todo";

const Card = (props) => {
  const { id, title, body } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 게시물 삭제 핸들러
  const deleteHandler = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(__delTodo(id));
    },
    [dispatch, id]
  );

  // 게시물 수정 핸들러
  const editHandler = useCallback(
    (e) => {
      e.preventDefault();

      navigate(`/edit/${id}`);
    },
    [id, navigate]
  );

  return (
    <Container>
      <ToDetail to={`/${id}`}>
        <h2>{title}</h2>
        <p>{body}</p>
        <button onClick={deleteHandler}>삭제</button>
        <button onClick={editHandler}>수정</button>
      </ToDetail>
    </Container>
  );
};

export default Card;

const Container = styled.li`
  & * {
    text-decoration: none;
  }
`;

const ToDetail = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  background-color: white;

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;
