import React, {useCallback} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";

function FullSceen() {
  const handle = useFullScreenHandle();

  return (
    <div>
      <button onClick={handle.enter}>
        Enter fullscreen
      </button>

      <FullScreen handle={handle}>
      <Row className="fullscreen-nav">
        agrosuper, 21-12-2020, 15:06


      </Row>
      </FullScreen>
    </div>
  );
}
 
export default FullSceen;