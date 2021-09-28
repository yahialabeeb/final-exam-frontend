import React, { Component } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
export class UpdateModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return (
            <Modal show={this.props.showUpdate}>
                <Modal.Header >
                    <Modal.Title>{this.props.favUpdated.name}</Modal.Title>
                    <Button onClick={this.props.closeModal}>X</Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={()=>this.props.savingUpdate(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Fruit Name</Form.Label>
                            <Form.Control name="name" type="text" defaultValue={this.props.favUpdated.name} />
                            <Form.Label>Fruit Image Url</Form.Label>
                            <Form.Control name="image" type="text" defaultValue={this.props.favUpdated.image} />
                            <Form.Label>Fruit Price</Form.Label>
                            <Form.Control name="price" type="text" defaultValue={this.props.favUpdated.price} />
                        </Form.Group>
                        <Button type="submit" variant="primary">Save changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default UpdateModal
