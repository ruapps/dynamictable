import React, { useState } from 'react';
import {Button, Modal, Form, Col} from 'react-bootstrap';

const Modaladdtype = (props)=> {
const [val, setVal]=useState('');



  return (
    <>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Test Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={(e)=> props.createType( e, val)}>
                <Form.Group as={Col} controlId="formGridMobno">
                    <Form.Control type="text" name="addtype" value={val} onChange={(e)=> setVal(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-4'>
                    Create
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modaladdtype;
