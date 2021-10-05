import {
  Card,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    {
      props.item.curPrice < e.target[0].value &&
        props.bidAuction(props.item.id, e.target[0].value);
    }
  };
  return (
    <>
      <Card
        id='card-container'
        className='container col-md-4'
        style={{
          width: '20rem',
          height: '100%',
        }}
      >
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${props.item.imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className='w-100'
        />

        <Card.Body className='card-body'>
          <Card.Title className='lead display-6'>{props.item.title}</Card.Title>
          <Card.Text className=''>{props.item.desc}</Card.Text>
          <Card.Text className='lead display-12'>
            {days && days + ' d: '}
            {hours} hr: {minutes} min: {seconds} sec
          </Card.Text>
          <InputGroup className='sm-3' size='md'>
            <InputGroup.Text>Owner</InputGroup.Text>
            <InputGroup.Text>
              {!props.owner ? (
                <div>Login First</div>
              ) : props.owner ? (
                props.item.email
              ) : props.owner.item === props.item.email ? (
                ''
              ) : (
                ''
              )}
            </InputGroup.Text>
          </InputGroup>
        </Card.Body>
        <ListGroup className='list-group-flush d-flex jsutify-content-between align-item-center'>
          <ListGroupItem>
            <InputGroup className='sm-3' size='md'>
              <InputGroup.Text className=''>Top Bid</InputGroup.Text>
              <InputGroup.Text className=''>
                ${props.item.curPrice}
              </InputGroup.Text>
            </InputGroup>
          </ListGroupItem>
          <ListGroupItem>
            <InputGroup className='sm-3 ' size='md'>
              <InputGroup.Text className='current-winner'>
                Winner
              </InputGroup.Text>
              <InputGroup.Text className='current-winner'>
                {props.item.curWinner ? (
                  <div>{props.item.curWinner}</div>
                ) : !props.owner ? (
                  <div>Login First</div>
                ) : (
                  ''
                )}
              </InputGroup.Text>
            </InputGroup>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link style={{ textDecoration: 'none' }}>
            {!props.owner ? (
              <InputGroup className='sm-3'>
                <FormControl
                  placeholder='Your bid goes here'
                  aria-label='Your bid goes here'
                  aria-describedby='basic-addon2'
                  type='number'
                  min='1'
                />
                <Button
                  variant='outline-secondary'
                  id='button-addon2'
                  onClick={() => props.bidAuction()}
                >
                  Bid
                </Button>
              </InputGroup>
            ) : props.owner.email === props.item.email ? (
              <div
                onClick={() => props.endAuction(props.item.id)}
                className='btn btn-outline-secondary cancel container'
              >
                Cancel Auction
              </div>
            ) : props.owner.email === props.item.curWinner ? (
              <InputGroup className='sm-3' size='md'>
                <InputGroup.Text className='winner container'>
                  You are the winner
                </InputGroup.Text>
              </InputGroup>
            ) : (
              <form onSubmit={(e) => handleSubmit(e)}>
                <InputGroup
                  className='input sm-3 ms-auto'
                  onkeyup='if(value<0){value = value * -1}'
                  aria-valuemin='1'
                >
                  <FormControl
                    placeholder='Your bid goes here'
                    aria-label='Your bid goes here'
                    aria-describedby='basic-addon2'
                    type='number'
                    min='0'
                    onSubmit={() =>
                      props.bidAuction(props.item.id, props.item.curPrice)
                    }
                  />
                  <Button
                    variant='outline-secondary'
                    type='submit'
                    id='button-addon2'
                  >
                    Bid
                  </Button>
                </InputGroup>
              </form>
            )}
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export const AuctionCard = ({ item }) => {
  let expiredDate = item.duration;

  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={renderer}
    />
  );
};
