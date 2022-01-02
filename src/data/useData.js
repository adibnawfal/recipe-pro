import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";

const useData = (ref) => {
  const [dataState, setDataState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    return onSnapshot(ref, (snapshot) => {
      const data = [];

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setDataState({
        data: data,
        loading: false,
      });
    });
  }, []);

  return dataState;
};

export { useData };
