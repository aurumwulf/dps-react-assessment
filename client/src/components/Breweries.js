import React from 'react';
import axios from 'axios';
import {
  Card,
  Container,
  Divider,
  Grid,
  Image,
} from 'semantic-ui-react';

class Breweries extends React.Component {
  state = { breweries: [] };

  componentDidMount() {
    axios.get('/api/all_breweries').then((res) => {
      const { entries } = res.data;
      this.setState({ breweries: entries });
    });
  }

  listBreweries = () => {
    const { breweries } = this.state;
    return breweries.map((brewery) => (
      <Grid.Column width={4}>
        <Card key={brewery.id}>
          {/* <Image src={brewery.image.square_medium} /> */}
          <Card.Content>
            <Card.Header as="h4">
              {brewery.name}
            </Card.Header>
            <Card.Meta>
              Established {brewery.established}
            </Card.Meta>
            <Card.Description />
          </Card.Content>
        </Card>;
      </Grid.Column>
    ));
  };

  render() {
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row stretched>
            {this.listBreweries()}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Breweries;
