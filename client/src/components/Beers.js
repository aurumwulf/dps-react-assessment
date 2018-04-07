import React from 'react';
import axios from 'axios';
import {
  Card,
  Container,
  Divider,
  Grid,
  Image,
  Label,
} from 'semantic-ui-react';

class Beers extends React.Component {
  state = { beers: [] };

  componentDidMount() {
    axios.get('/api/all_beers').then((res) => {
      const { entries } = res.data;
      this.setState({ beers: entries });
    });
  }

  hasLabel = (beer) => {
    if (beer.hasOwnProperty('labels') === true) {
      return <Image src={beer.labels.medium} />;
    } else {
      return (
        <Label
          content="Image not found!"
          icon="warning"
        />
      );
    }
  };

  listBeers = () => {
    const { beers } = this.state;
    return beers.map((beer) => (
      <Grid.Column width={4}>
        <Card key={beer.id}>
          {this.hasLabel(beer)}
          <Card.Content>
            <Card.Header as="h4">{beer.name}</Card.Header>
            <Card.Meta>ABV: {beer.abv}%</Card.Meta>
            <Card.Description>
              {beer.style.name}
            </Card.Description>
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
            {this.listBeers()}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Beers;
