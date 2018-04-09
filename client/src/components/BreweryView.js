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

class BreweryView extends React.Component {
  state = { brewery: [] };

  componentDidMount() {
    axios
      .get(`/api/brewery/${this.props.match.params.id}`)
      .then((res) => {
        const { entries } = res.data;
        this.setState({ brewery: entries });
      });
  }

  hasImage = (brewery) => {
    if (brewery.hasOwnProperty('images') === true) {
      return (
        <Image
          centered
          src={brewery.images.square_medium}
        />
      );
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

  showBrewery = () => {
    const { brewery } = this.state;
    return brewery.map((brewery, index) => (
      <Grid.Column key={index + 1} width={16}>
        {this.hasImage(brewery)}
        <Card fluid>
          <Card.Content>
            <Card.Header as="h4">
              {brewery.name}
            </Card.Header>
            {this.hasWebsite(brewery)}
            <Divider />
            <Card.Description>
              {brewery.description}
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    ));
  };

  render() {
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>{this.showBrewery()}</Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default BreweryView;
