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

  // 현재 게시물 생성인지 기존 게시물 수정인지 여부를 저장하는 변수
  const isEdit = useMemo(() => (id ? true : false), [id]);

  // 인풋에 모든 정보를 입력했는지에 대한 유효성 검사를 진행하는 커스텀 훅
  const { validation } = useValidation(todo);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      // 게시물 생성인지 수정인지 여부에 따른 다른 디스패치 액션 실행
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

  // edit일 경우 해당 게시물에 원래 데이터를 가져와서 사용하기 위한 함수
  // useEffect에 직접 작성하는 것이 아닌 따로 함수를 만든 이유는
  // useEffect에서는 async await 문법을 사용할 수 없이 때문 입니다.
  const requestUpdate = useCallback(async () => {
    if (isEdit) {
      const todo = await getTodoApi(id);

      setTodo(todo);
    }
  }, [id, isEdit]);

  // 수정 페이지로 진입시 데이터 갱신을 위한 useEffect
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
            required
          />
        </InputWrap>
        <InputWrap>
          <label htmlFor={"body"}>내용</label>
          <input
            id={"body"}
            name={"body"}
            value={todo.body}
            onChange={onChangeHandler}
            required
          />
        </InputWrap>

        {/* useValidation 커스텀 훅에서 진행한 결과에 따라 disabled 설정을 해준다. */}
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
