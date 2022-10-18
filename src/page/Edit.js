import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getTodoApi } from "../axios/todoApi";
import useValidation from "../hooks/useValidation";
import { __addTodo, __updateTodo } from "../redux/todo";

const init = {
  title: "",
  body: "",
};

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [todo, setTodo] = useState(init);

  const isEdit = useMemo(() => (id ? true : false), [id]);

  const { validation } = useValidation(todo);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (isEdit) {
        dispatch(__updateTodo(todo));
      } else {
        dispatch(__addTodo(todo));
      }

      navigate("/", { replace: true });
    },
    [dispatch, isEdit, navigate, todo]
  );

  const onChangeHandler = useCallback(
    (event) => {
      const { name, value } = event.target;

      setTodo({ ...todo, [name]: value });
    },
    [todo]
  );

  const requestUpdate = useCallback(async () => {
    if (isEdit) {
      const todo = await getTodoApi(id);

      setTodo(todo);
    }
  }, [id, isEdit]);

  useEffect(() => {
    requestUpdate();
  }, [requestUpdate]);

  return (
    <>
      <Link to={-1}>뒤로가기</Link>
      <Container onSubmit={onSubmitHandler}>
        <InputWrap>
          <label htmlFor={"title"}>제목</label>
          <input
            id={"title"}
            name={"title"}
            value={todo.title}
            onChange={onChangeHandler}
          />
        </InputWrap>
        <InputWrap>
          <label htmlFor={"body"}>내용</label>
          <input
            id={"body"}
            name={"body"}
            value={todo.body}
            onChange={onChangeHandler}
          />
        </InputWrap>

        <button disabled={!validation} type="submit">
          등록하기
        </button>
      </Container>
    </>
  );
};

export default Edit;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;

  button:enabled {
    cursor: pointer;
  }
`;

const InputWrap = styled.div`
  display: flex;
  gap: 20px;

  input {
    flex: 1;
  }
`;
