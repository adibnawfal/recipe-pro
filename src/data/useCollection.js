import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";

const useCollection = (ref) => {
  const [dataState, setDataState] = useState({
    dataCollection: [],
    loadingCollection: true,
  });

  useEffect(() => {
    return onSnapshot(ref, (snapshot) => {
      const data = [];

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setDataState({
        dataCollection: data,
        loadingCollection: false,
      });
    });
  }, []);

  return dataState;
};

export { useCollection };
