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

class Beers extends React.Component {
  state = { beers: [], page: null };

  componentDidMount = () => {
    axios.get('/api/all_beers').then((res) => {
      const { entries, page } = res.data;
      this.setState({
        beers: entries,
        page: page,
      });
    });
  };
  // loadMore = () => {
  //   const { beers, page } = this.state;
  //   axios
  //     .get(`/api/all_beers?page=${page}&per_page=10`)
  //     .then((res) => {
  //       const { entries } = res.data;
  //       this.setState({
  //         beers: beers.concat(entries),
  //         page: page + 1,
  //       });
  //     });
  // };

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

  hasStyle = (beer) => {
    if (beer.hasOwnProperty('style') === true) {
      return (
        <Card.Description>
          {beer.style.name}
        </Card.Description>
      );
    }
  };

  listBeers = () => {
    const { beers } = this.state;
    return beers.map((beer) => (
      <Grid.Column key={beer.id} width={3}>
        <Card>
          {this.hasLabel(beer)}
          <Card.Content>
            <Card.Header as="h4">{beer.name}</Card.Header>
            <Card.Meta>ABV: {beer.abv}%</Card.Meta>
            {/* {this.hasStyle(beer)} */}
          </Card.Content>
        </Card>;
      </Grid.Column>
    ));
  };

  render() {
    const { page } = this.state;
    return (
      <Container>
        <Divider hidden />
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={() => this.loadMore}
          hasMore={true || false}
          useWindow={false}> */}
        <Grid>
          <Grid.Row stretched>
            {this.listBeers()}
          </Grid.Row>
        </Grid>
        {/* </InfiniteScroll> */}
      </Container>
    );
  }
}

export default Beers;
