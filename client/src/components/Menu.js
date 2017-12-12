import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Dimmer, Loader, List, Button } from 'semantic-ui-react';
import DishForm from './DishForm';
import axios from 'axios';

class Menu extends React.Component {
    state = { menu: [] };

    componentDidMount() {
        axios.get('api/menus')
            .then( res => {
            this.setState({ menu: res.data })
                
            })
            .catch( err => {
                console.log(err);
        });
    }

    displayMenus = () => {
        return this.state.menu.map( menu => {
          return(
            <List.Item as='li'>
                <Link to={`/dish/${menu.id}`}>
                {menu.dish} - ${menu.price}
                </Link>
            </List.Item>
          )
        });
      }

    menusLoader() {
        return(
            <Dimmer active style={styles.dimmer}>
                <Loader>Loading Menus...</Loader>
            </Dimmer>
        )
    }

    render() {
        return(
            <Segment basic>
                <DishForm />
                { this.state.menu.length > 0 ?
                    <List as='ul'>
                        {this.displayMenus()}
                    </List> :
                        this.menusLoader()
                }
            </Segment>
        )
    }
}

const styles = {
    dimmer: {
        height: '100vh'
    },
}

export default Menu;