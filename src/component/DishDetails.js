import React from 'react'

    import { Card, CardImg, CardText, CardBody,
        CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
    import { Link } from 'react-router-dom';

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
function DishDetails({dish,comments}) {
console.log(dish)
    
  return (
    <div className="container">
    <div className="row">
        <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{dish?.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{dish?.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments comments={comments} />
        </div>
    </div>
    </div>
);
  }

export default DishDetails
