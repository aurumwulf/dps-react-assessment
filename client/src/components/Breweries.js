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
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';

class Breweries extends React.Component {
  state = { breweries: [], page: 1, total_pages: null };

  componentDidMount() {
    this.loadMore();
  }

  loadMore = () => {
    const { breweries, page } = this.state;
    axios
      .get(`/api/all_breweries?page=${page}&per_page=10`)
      .then((res) => {
        const { entries, total_pages } = res.data;
        this.setState({
          breweries: breweries.concat(entries),
          page: page + 1,
          total_pages: total_pages,
        });
      });
  };

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
    return breweries.map((brewery, index) => (
      <Grid.Column key={index + 1} width={4}>
        <Card>
          {this.hasImage(brewery)}
          <Card.Content>
            <Link to={`/breweries/${brewery.name}`}>
              <Card.Header as="h4">
                {brewery.name}
              </Card.Header>
            </Link>
            {this.hasWebsite(brewery)}
          </Card.Content>
        </Card>;
      </Grid.Column>
    ));
  };

  render() {
    const { page, total_pages } = this.state;
    return (
      <Container>
        <Divider hidden />
        <InfiniteScroll
          loadMore={this.loadMore()}
          hasMore={page < total_pages}
          useWindow={false}>
          <Grid>
            <Grid.Row stretched>
              {this.listBreweries()}
            </Grid.Row>
          </Grid>
        </InfiniteScroll>
      </Container>
    );
  }
}

export default Breweries;
