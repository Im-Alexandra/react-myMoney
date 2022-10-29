import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //await means that the code below this line will only execute once the await is done
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //we have to create a cleanup function because we are updating state with hook
  //e.g. if you click logout but immediately click on new page, there will be an error because the front end changes
  //to combat that we create cleanup function
  //this creates a check in case user clicks away and wants to terminate the logout
  useEffect(() => {
    //this fires off when the component is unmounted
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
