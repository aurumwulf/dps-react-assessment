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

class Breweries extends React.Component {
  state = { breweries: [] };

  componentDidMount() {
    axios.get('/api/all_breweries').then((res) => {
      const { entries } = res.data;
      this.setState({ breweries: entries });
    });
  }

  hasImage = (brewery) => {
    if (brewery.hasOwnProperty('images') === true) {
      return <Image src={brewery.images.square_medium} />;
    } else {
      return (
        <Label
          content="Image not found!"
          icon="warning"
        />
      );
    }
  };

  hasWebsite = (brewery) => {
    if (brewery.hasOwnProperty('website') === true) {
      return (
        <Card.Meta>
          Visit us at: {brewery.website}
        </Card.Meta>
      );
    } else {
      return (
        <Label
          content="Website not found!"
          icon="warning"
        />
      );
    }
  };

  listBreweries = () => {
    const { breweries } = this.state;
    return breweries.map((brewery) => (
      <Grid.Column key={brewery.id} width={4}>
        <Card>
          {this.hasImage(brewery)}
          <Card.Content>
            <Card.Header as="h4">
              {brewery.name}
            </Card.Header>
            {this.hasWebsite(brewery)}
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
