
export interface TestGraphQLProps {
    tickers: Array<String>
}

export type Stock = {
    symbol: String,
    description: String,
    currentPrice: number,
    openPrice: number,
    highPrice: number,
    lowPrice: number
}