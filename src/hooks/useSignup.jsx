import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  //async means we can use await
  //the arguments depends on what firebase allows to be stored when using the auth
  const signup = async (email, password, displayName) => {
    //this is to reset the errors we might get when filling out the form
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Couldnot complete signup");
      }

      //add display name to the user
      await res.user.updateProfile({ displayName });

      //dispatch login action - this will login the user who just signed up
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

  //cleanup function in case component is unmounted
  useEffect(() => {
    //this fires off when the component is unmounted
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
