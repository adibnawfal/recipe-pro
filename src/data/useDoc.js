import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";

const useDoc = (ref) => {
  const [dataState, setDataState] = useState({
    dataDoc: {},
    loadingDoc: true,
  });

  useEffect(() => {
    return onSnapshot(ref, (doc) => {
      const data = { ...doc.data() };

      setDataState({
        dataDoc: data,
        loadingDoc: false,
      });
    });
  }, []);

  return dataState;
};

export { useDoc };
