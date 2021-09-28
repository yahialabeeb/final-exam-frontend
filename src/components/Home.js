import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { withAuth0 } from '@auth0/auth0-react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFruits: []
    }
  }
  componentDidMount() {
    axios.get(`https://fruit-api-301.herokuapp.com/getFruit`).then((result) => {
      console.log(result.data.fruits);
      this.setState({
        allFruits: result.data.fruits
      })

    })
  }
  addToFav = (item) => {
    let body = {
      name: item.name,
      image: item.image,
      price: item.price,
      email: this.props.auth0.user.email,
    }

    axios.put(`${process.env.REACT_APP_SERVER}addtofav`, body).then((result) => {
      this.setState({
        allFruits: result.data
      })
    })
  }
  render() {
    return (
      <>
        <Row md={3}>
          {this.state.allFruits.map((item, idx) => {
            return (
              <Card key={idx} style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <img src={item.image} style={{ width: '18rem' }} />
                    <br />
                    Price: {item.price}
                  </Card.Text>
                  <Button onClick={() => this.addToFav(item)} variant="primary">Add to Favorite</Button>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </>
    )
  }
}

export default withAuth0(Home);
