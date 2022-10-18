import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTodoApi } from "../axios/todoApi";

const Detail = () => {
  const [todo, setTodo] = useState(null);

  const { id } = useParams();

  // id에 해당하는 게시물을 서버에서 가져와 업데이트 합니다.
  // 해당 코드를 useEffect가 아닌 requestUpdate함수를 따로 만든 이유는
  // useEffect에서는 async await 문법을 사용할 수 없기 때문입니다.
  const requestUpdate = useCallback(async () => {
    const response = await getTodoApi(id);

    setTodo(response);
  }, [id]);

  // id에 해당하는 게시물을 서버에서 가져와 업데이트 합니다.
  useEffect(() => {
    requestUpdate();
  }, [requestUpdate]);

  // todo의 초기값이 null이기 때문에
  // requestUpdate를 통해 todo를 갱신하기 전까지 페이지를 표시하지 않습니다.
  if (!todo) {
    return null;
  }

  return (
    <div>
      <Link to={-1}>뒤로가기</Link>
      <h2>{todo.title}</h2>
      <p>{todo.body}</p>
    </div>
  );
};

export default Detail;
