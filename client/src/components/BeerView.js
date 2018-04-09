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

class BeerView extends React.Component {
  state = { beer: [] };

  componentDidMount() {
    axios
      .get(`/api/beer/${this.props.match.params.id}`)
      .then((res) => {
        const { entries } = res.data;
        this.setState({ beer: entries });
      });
  }

  hasLabel = (beer) => {
    if (beer.hasOwnProperty('labels') === true) {
      return <Image centered src={beer.labels.medium} />;
    } else {
      return (
        <Label
          content="Image not found!"
          icon="warning"
        />
      );
    }
  };

  hasStyle = (beer) => {
    if (beer.hasOwnProperty('style') === true) {
      return (
        <Card.Description>
          {beer.style.name}
        </Card.Description>
      );
    } else {
      return null;
    }
  };

  showBeer() {
    const { beer } = this.state;
    return beer.map((beer, index) => (
      <Grid.Column key={index + 1} width={16}>
        {this.hasLabel(beer)}
        <Card fluid>
          <Card.Content>
            <Card.Header as="h4">{beer.name}</Card.Header>
            <Card.Meta>ABV: {beer.abv}%</Card.Meta>
            {this.hasStyle(beer)}
            <Divider />
            <Card.Description>
              {beer.description}
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    ));
  }

  render() {
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>{this.showBeer()}</Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default BeerView;
