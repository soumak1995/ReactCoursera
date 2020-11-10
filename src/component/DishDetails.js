import React, { Component } from 'react'

    import { Card, CardImg, CardText, CardBody,
        CardTitle, Breadcrumb, BreadcrumbItem,Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Row, Col, Label ,Button} from 'reactstrap';
    import { Link } from 'react-router-dom';
    import { Control, LocalForm, Errors } from 'react-redux-form';
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
    const RenderDish=({dish})=>{
       
        return (
        <Card  >
        <CardImg top src={dish?.image} alt={dish?.name} />
        <CardBody>
        <CardTitle>{dish?.name}</CardTitle>
        <CardText>{dish?.description}</CardText>
        </CardBody>
        </Card>

        )
        
        };
    const RenderComments=({comments})=>(
        comments.map((m,index)=>(
            <div key={index}>
                 
            <p>{m.comment}</p>
            --<strong>{m.author}</strong><p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(m.date)))}</p>
    
          </div>

        )) 
        

    );
class DishDetails extends Component {
 constructor(props){
    super(props)
    this.state = {
        isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
 }
 toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };
  handleSubmit(values){
      console.log(values)
      this.toggleModal();
  }
    render(){
        return (
            <>
            <div className="container">
            <div className="row">
                <Breadcrumb>
        
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish?.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish?.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={this.props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={this.props.comments} />
                    <button className="btn btn-outline-secondary" onClick={this.toggleModal}><span className="fa fa-pencil" ></span>Submit Comment</button>
                </div>
               
            </div>
          
            </div>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <FormGroup>
                                <Label htmlFor="rating" >Rating</Label>
                                
                                    <Control.text model=".rating" id="rating" name="rating"
                                       
                                        className="form-control"
                                        validators={{
                                            required, maxLength: maxLength(1),isNumber
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            maxLength: 'Must be 1 number',
                                            isNumber: 'Must be a number'
                                        }}
                                     />
                                
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                
                                    <Control.text model=".name" id="name" name="name"
                                      
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                              
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment" >Comment</Label>
                                
                                    <Control.textarea model=".comment" id="telnum" name="telnum"
                                    
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(5)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 5 characters',

                                           
                                        }}
                                     />
                               
                            </FormGroup>
                            <FormGroup className="form-group">
                                  
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                   
                                </FormGroup>
                            </LocalForm>
              </ModalBody>
          </Modal>
          </>
        );

    }
  
  }

export default DishDetails
