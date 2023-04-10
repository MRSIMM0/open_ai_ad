import React, { useEffect } from "react";
import Column from "../../layout/column/Column";
import Input from "../../components/input/Input";
import Text from "../../components/text/Text";
import Spacer from "../../layout/sapcer/Spacer";

import { useDispatch } from "react-redux";

import { setError } from "../../features/error";

import { changeView } from "../../features/view";
import { ViewsNames } from "../../features/constants";

import {toggleLoading} from "../../features/loading"

export default function LoginPage() {
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(toggleLoading(false))
  })

  const handleLogin = (text, setTest) => {
 
    fetch("http://localhost:8080/v1/api/auth/authorize", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ password: text }),
    }).then((res) => {
      if (res.status == 401) {
        dispatch(setError("Wrong password"));
      }else{
        dispatch(changeView(ViewsNames.Main))
      }
    });

  };

  return (
    <Column width="50vw" center={true}>
      <Text>Authorization</Text>
      <Spacer height="50px"></Spacer>
      <Input
        type="password"
        placeholder="Enter Password"
        onSubmit={(text, setTest) => handleLogin(text, setTest)}
      />
      <Spacer height="100px"></Spacer>
    </Column>
  );
}
