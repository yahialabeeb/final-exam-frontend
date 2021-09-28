import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Row, Card, Button } from 'react-bootstrap'
import axios from 'axios';
import UpdateModal from './UpdateModal';
import { withAuth0 } from '@auth0/auth0-react';
class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favFruits: [{
        name: "Apple",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
        price: 35
      }],
      showUpdate: false,
      favUpdated: ''
    }
  }
  componentDidMount() {
   let userEmail = this.props.auth0.user.email
   console.log(userEmail);
    axios.get(`${process.env.REACT_APP_SERVER}getfav?email=${userEmail}`).then((result) => {
      this.setState({
        favFruits: result.data
      })
    })
  }
  update = (item) => {
    console.log(item);
    this.setState({
      showUpdate: true,
      favUpdated: item
    })
  }
  delete = (item) => {
   let userEmail = this.props.auth0.user.email
    axios.delete(`${process.env.REACT_APP_SERVER}deletefav?name=${item.name}&email=${userEmail}`).then((result) => {
      this.setState({
        favFruits: result.data
      })
    })

  }
  closeModal = () => {
    this.setState({
      showUpdate: false,
    })
  }
  savingUpdate = (e) => {
    e.preventDefault();
    let body = {
      name: e.target.name.value,
      image: e.target.image.value,
      price: e.target.price.value,
      email: this.props.auth0.user.email
    }
    axios.put(`${process.env.REACT_APP_SERVER}updatefav`, body).then((result) => {
      this.setState({
        allFruits: result.data,
        showUpdate: false,
      })
    })
  }
  render() {
    return (
      <>
        <Row md={3}>
          {this.state.favFruits.map((item, idx) => {
            return (

              <Card key={idx} style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <img src={item.image} />
                    <br />
                    Price: {item.price}
                  </Card.Text>
                  <Button onClick={() => this.update(item)} variant="primary">Update</Button>
                  <Button onClick={() => this.delete(item)} variant="primary">Delete</Button>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
        <UpdateModal
          showUpdate={this.state.showUpdate}
          favUpdated={this.state.favUpdated}
          closeModal={this.closeModal}
          savingUpdate={this.savingUpdate}
        />
      </>
    )
  }
}

export default withAuth0(FavFruit);
