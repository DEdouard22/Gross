import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './User.css';

class User extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let { id, name, description} = this.props.user;
        return (
            <div>
                <Card className="rounded">
                    <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <CardSubtitle>{id}</CardSubtitle>
                        <CardText>{description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default User;