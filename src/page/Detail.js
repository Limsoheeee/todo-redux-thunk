import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTodoApi } from "../axios/todoApi";

const Detail = () => {
  const [todo, setTodo] = useState(null);

  const { id } = useParams();

  const requestUpdate = useCallback(async () => {
    const response = await getTodoApi(id);

    setTodo(response);
  }, [id]);

  useEffect(() => {
    requestUpdate();
  }, [requestUpdate]);

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
