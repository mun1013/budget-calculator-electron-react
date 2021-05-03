import { Modal, Button } from 'react-bootstrap';

function Modals(props) {
  function handleClose(){
    props.onClickCancel(false);
  }

  function handleOk() {
    props.onClickOk(false);
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.body}</Modal.Body>
    <Modal.Footer>
      {props.secondBtn && <Button variant="secondary" onClick={handleClose}>
        {props.secondBtn}
      </Button>}
      <Button variant="primary" onClick={handleOk}>
        {props.primaryBtn}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default Modals;