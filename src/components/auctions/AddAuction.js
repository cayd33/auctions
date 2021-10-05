import {
  Button,
  Form,
  Modal,
  Alert,
  Row,
  Col,
  Dropdown,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';

export const AddAuction = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();
  const itemImage = useRef();

  const { currentUser } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (!imgTypes.includes(itemImage.current.files[0].type)) {
      return setError('Please use a valid image');
    }

    let dueDate = moment().add(itemDuration.current.value, 'hours').format();

    let newAuction = {
      email: currentUser.email,
      title: itemTitle.current.value,
      desc: itemDesc.current.value,
      curPrice: startPrice.current.value,
      duration: dueDate,
      itemImage: itemImage.current.files[0],
    };

    setAuction(newAuction);
    closeForm();
  };

  return (
    <>
      <div className='col d-flex justify-content-center my-3'>
        <div onClick={openForm} className='btn btn-outline-secondary mx-2'>
          + Auction
        </div>
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Create Auction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant='danger'>{error}</Alert>}

            <Form.Group className='mb-3'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type='text' required ref={itemTitle} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Product Description</Form.Label>
              <Form.Control type='text' required ref={itemDesc} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Starting Bid</Form.Label>
              <Form.Control type='number' required ref={startPrice} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Product Duration in hours</Form.Label>
              <Form.Control type='number' required ref={itemDuration} min='1' />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Seller</Form.Label>
              <Form.Control
                type='text'
                value={currentUser.email}
                readOnly
                id='seller'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              {/* <Form.Label>Product Image</Form.Label>
              <Form.File
                label='Select Product Image'
                custom
                required
                ref={itemImage}
              /> */}
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type='file'
                size='lg'
                label='Select Product Image'
                required
                custom
                ref={itemImage}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={closeForm}
              className='btn btn-outline-secondary cancel'
            >
              Cancel
            </Button>
            <Button
              variant='primary'
              type='submit'
              className='btn btn-outline-secondary mx-2'
            >
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
