import React, { useEffect, useState } from "react";
import Carusel from "../../components/carusel/Carusel";
import Column from "../../layout/column/Column";
import Row from "../../layout/row/Row";
import Spacer from "../../layout/sapcer/Spacer";
import BackButton from "../../components/back-button/BackButton";
import Text from "../../components/text/Text";

import {  useSelector } from "react-redux";




export default function DetailPage() {
  const details = useSelector((state) => state.details.value);


  return (
    <Column width="100vw">
      <BackButton></BackButton>
      <Spacer height="16vh" />
      <Row width="30%" height="42vh">
        <Carusel links={details.links} />
      </Row>
      <Spacer height="10vh" />
      <Row width="100%">
        <Text>{details.response}</Text>
      </Row>
      <Spacer height="50px" />
    </Column>
  );
}
