import { useEffect, useState } from "react";

const useValidation = (obj) => {
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    const valiCheck = Object.values(obj).findIndex((value) => !value);

    setValidation(valiCheck === -1 ? true : false);
  }, [obj]);

  return { validation, setValidation };
};

export default useValidation;
