import React, { Component } from 'react';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';
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
import { baseUrl } from '../shared/baseUrl';
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
    );
  else return <div></div>;
}

function RenderComments({comments, postComment, dishId}) {
  if (comments != null)
    return (
      <div>
        <h4> Comments: </h4>
        <ul className="list-unstyled ">
          {comments.map((comment) => {
            return (
              <Stagger in>
              {comments.map((comment) => {
                  return (
                      <Fade in>
                      <li key={comment.id}>
                      <p>{comment.comment}</p>
                      <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                      </li>
                      </Fade>
                  );
              })}
              </Stagger>
            );
          })}
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  else return <div></div>;
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
else if (props.dish != null) 
return (
  <div className="container">
    <div className="row">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/menu">Menu</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="col-12">
        <h3>{props.dish.name}</h3>
        <hr />
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-5 m-1">
        <RenderDish dish={props.dish} />
      </div>
      <div className="col-12 col-md-5 m-1">
        <RenderComments comments={props.comments}
    postComment={props.postComment}
    dishId={props.dish.id} />
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
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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