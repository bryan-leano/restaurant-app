import React, { Component } from 'react';
import { Segment, Form, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DishForm extends Component {
    state = { menu: { dish: '', ingredient: '', price: ''} };

    componentDidMount() {
        const match = this.props.match;

        if(match)
            axios.get(`/api/menus/${match.params.id}`)
                .then(res => {
                    this.setState({ menu: res.data })
                })
                .catch( err => {
                    console.log(err);
                });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let baseUrl = '/api/menus';
        const { id, dish, ingredient, price } = this.state.menu;
        baseUrl = id ? `${baseUrl}/${id}` : baseUrl;

        const params = { menu: { dish, ingredient, price } }

        if(id)
            axios.put(baseUrl, params)
                .then( res => {
                    this.props.history.push(`/menus/${id}`);
                })
                .catch( err => {
                    console.log(err);
                })
        else
            axios.post(baseUrl, params)
                .then( res => {
                    this.props.history.push(`/menu`);
                })
                .catch( err => {
                    console.log(err);
                })
    }

    handleChange = (e) => {
        const { id, value } = e.target;

        this.setState({ menu: {...this.state.menu, [id]: value } })
    }

    cancelButton = () => {
        const { id } = this.state.menu;

        if(id)
            return(<Button as={Link} to={`/menus/${id}`}>Cancel</Button>)
    }

    render() {
        const { dish, ingredient, price } = this.state.menu;

        return(
            <Form onSubmit={this.handleSubmit}>
            <Label>Dish Name:</Label>
            <Form.Input value={dish} id='dish' onChange={this.handleChange} />
    
            <Label>Dish Price:</Label>
            <Form.Input value={price} id='price' onChange={this.handleChange} />
            
            <Label>Dish Ingredient:</Label>
            <Form.Input value={ingredient} id='ingredient' onChange={this.handleChange} />
    
            { this.cancelButton() }
            <Button primary type='submit'>Save</Button>
          </Form>
        );
    }
}

export default DishForm;