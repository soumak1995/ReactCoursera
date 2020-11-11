import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  else return <div></div>;
}

function RenderComments({comments, addComment, dishId}) {
  if (comments != null)
    return (
      <div>
        <h4> Comments: </h4>
        <ul className="list-unstyled ">
          {comments.map((comment) => {
            return (
              <div>
                <li>{comment.comment}</li>
                <li>
                  --{comment.author},
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                  }).format(new Date(Date.parse(comment.date)))}
                </li>
              </div>
            );
          })}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment}></CommentForm>
      </div>
    );
  else return <div></div>;
}

const DishDetail = (props) => {
  if (props.selectedDish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.selectedDish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.selectedDish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.selectedDish.id} />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    // event.preventDefault();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <div>
        <Button className="text-white bg-dark" outline onClick={this.toggleModal}>
          <span className="fa fa-edit fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Col className="form-group">
                <Row md={12}>
                  <Label htmlFor="rating">Rating</Label>
                </Row>
                <Row md={12}>
                  <Control.select model=".rating" name="rating" className="form-control ml-2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
              </Col>
              <Col className="form-group">
                <Row md={12}>
                  <Label htmlFor="author">Your Name</Label>
                </Row>
                <Row md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Row>
              </Col>
              <Col className="form-group">
                <Row md={12}>
                  <Label htmlFor="comment">Comment</Label>
                </Row>
                <Row md={12}>
                  <Control.textarea model=".comment" id="comment" rows="6" name="comment" className="form-control" />
                  <Errors className="text-danger" model=".comment" show="touched" />
                </Row>
              </Col>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;