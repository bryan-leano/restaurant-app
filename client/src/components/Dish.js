import React, { Component } from 'react';
import { Segment, Dimmer, Loader, List, Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dish extends Component {
    state = { menu: {}, loaded: false }

    componentDidMount() {
        const dishId = this.props.match.params.id
        axios.get(`/api/menus/${dishId}`)
            .then( res => {
                this.setState({ menu: res.data, loaded: true });
            })
            .catch( err => {
                console.log(err);
            })
    }

    deleteDish = () => {
        axios.delete(`/api/menus/${this.state.menu.id}`)
            .then( res => {
                this.props.history.push('/menu')
            })
            .catch( err => {
                console.log(err)
            })
    }

    displayDish = () => {
        const { id, dish, price, ingredient  } = this.state.menu;

        return(
          <Segment basic>
            <Header as='h1'>{dish}</Header>
            <List>
              <List.Item>Ingredient: {ingredient}</List.Item>
              <List.Item>Price: {price}</List.Item>
            </List>
            <Button as={Link} to={`/menus/${id}/edit`} color='orange'>Edit</Button>
            <Button color='red' onClick={() => this.deleteDish()}>Delete</Button>
            <Button as={Link} to='/menu'>All Dishes</Button>
          </Segment>
        );
      }

    render() {
        if(this.state.loaded)
        return(
            <Segment>
                { this.displayDish() }
            </Segment>
        )
        else
        return(
            <Dimmer active>
                <Loader>Loading Dish...</Loader>
            </Dimmer>
        );
    }
}

export default Dish;