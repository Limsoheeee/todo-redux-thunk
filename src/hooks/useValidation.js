import { useEffect, useState } from "react";

/**
 * 유효성 검사를 해주는 커스텀 훅
 * 인자로 들어온 obj의 값이 하나라도 false일 경우 validation state를 false로 변경한다
 */
const useValidation = (obj) => {
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    const valiCheck = Object.values(obj).findIndex((value) => !value);

    setValidation(valiCheck === -1 ? true : false);
  }, [obj]);

  return { validation, setValidation };
};

export default useValidation;
