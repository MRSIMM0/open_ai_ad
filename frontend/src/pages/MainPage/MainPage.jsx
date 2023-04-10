import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import Column from "../../layout/column/Column";
import Input from "../../components/input/Input";
import LinksContainer from "../../components/links_container/LinksContainer";
import Spacer from "../../layout/sapcer/Spacer";
import Row from "../../layout/row/Row";
import Button from "../../components/button/Button";
import FileUploader from "../../components/file_uploader/FileUploader";

import { useDispatch } from "react-redux";
import { clearLinks } from "../../features/links";
import { toggleLoading } from "../../features/loading";
import { changeView } from "../../features/view";

import { TbSend } from "react-icons/tb";
import { RiRestartLine } from "react-icons/ri";
import { ViewsNames } from "../../features/constants";

import { addLink } from "../../features/links";
import { setError } from "../../features/error";

import { setLinks, setResponse } from "../../features/details";

export default function MainPage() {
  const dispatch = useDispatch();

  const regex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );

  const onClickAction = (text, setText) => {
    if (text === "") {
      dispatch(setError("Url can not be null"));
      return;
    }

    if (!text.match(regex)) {
      dispatch(setError("Invalid URL"));
      return;
    }

    dispatch(addLink(text));
    setText("");
  };

  const links = useSelector((state) => state.links.value);

  const handleSubmit = () => {
    dispatch(toggleLoading());

    fetch("http://localhost:8080/v1/api/open/call", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ links: links }),
    })
      .then((res) => {
        if (res.status == 401) {
          dispatch(changeView(ViewsNames.Login));
          return;
        }
        res.text().then((res) => {


          

          dispatch(setResponse(res));

         

          fetch("http://localhost:8080/v1/api/open/links", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              response: res,
            }),
          }).then((response) => {
            response.json().then((data) => {
            
              dispatch(setLinks(data))

              dispatch(changeView(ViewsNames.Detail));
              dispatch(toggleLoading());
            });
          });
        });
      })
      .catch((err) => {
     
        dispatch(changeView(ViewsNames.Login));
      });
  };

  return (
    <Column width="1200px">
      <Spacer height="20px" />
      <Input
        placeholder="Input Url"
        onSubmit={(text, setTest) => onClickAction(text, setTest)}
      />
      <Spacer height="20px" />
      <LinksContainer links={links} />
      <Spacer height="20px" />
      <Row height="50px">
        <Button
          onClick={() => {
            dispatch(clearLinks());
          }}
        >
          <RiRestartLine />
        </Button>
        <Spacer width="30px" />
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          <TbSend />
        </Button>
      </Row>
      <Spacer height="50px" />
      <FileUploader></FileUploader>
      <Spacer height="50px" />
    </Column>
  );
}
