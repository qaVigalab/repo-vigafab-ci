import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const Alerta = (props) => {
  const [visible, setVisible] = useState(props.visible);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      Ordenes Cargadas Correctamente
    </Alert>
  );
}

export default Alerta;