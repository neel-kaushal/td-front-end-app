import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { Stock, TestGraphQLProps } from "./types"

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache()
  });
  
function CardComponent(props: any) {

    const stockQuery = gql`
    query ($tickers: [String], $currentPrice: Boolean!)
    {
       
       stocks(symbols: $tickers) {
            symbol
            description
            currentPrice @include(if: $currentPrice)
            openPrice
            highPrice
            lowPrice
          }
  }
    `

    const { loading, error, data } = useQuery(stockQuery, {variables: {tickers: props.tickers, currentPrice: false}});
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.stocks.map((entry: Stock) => {
      const mappedData: any = []
      Object.entries(entry).forEach(([key, value]) => {
          if(key === '__typename') {
            return
          }
          mappedData.push(
            <div key={key}>
            <p>
              {key}: {value}
            </p>
          </div>
          )
      });
      return mappedData
    })  
  }
  
export default function TestGraphQL(props: TestGraphQLProps) {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app 🚀</h2>
          <CardComponent tickers={props.tickers} />
        </div>
      </ApolloProvider>
    );
  }