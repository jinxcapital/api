import fetch from 'node-fetch';

interface FetchCandlesOptions {
  quote: string;
  base: string;
  startTime: Date;
  endTime: Date;
  resolution: number;
}

// https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductcandles
// [
//   1630116000, // time
//   48976.99, // low
//   49160.84, // high
//   49160.83, // open
//   49072.23, // close
//   123.30518726 // volume
// ]

export type CoinbaseEntry = Array<number>;
export type CoinbaseResponse = CoinbaseEntry[];

const fetchCandles = async (
  options: FetchCandlesOptions,
): Promise<CoinbaseResponse> => {
  const granularity = options.resolution;
  const start = options.startTime.toISOString();
  const end = options.endTime.toISOString();
  const product = `${options.base}-${options.quote}`.toUpperCase();

  try {
    const response = await fetch(
      `https://api.exchange.coinbase.com/products/${product}/candles?granularity=${granularity}&start=${start}&end=${end}`,
    );

    const json = (await response.json()) as CoinbaseResponse;
    if (Array.isArray(json)) {
      return json;
    }
  } catch (e) {
    console.error(`infra/coinbase/api error:`, e);

    return [];
  }

  return [];
};

const CoinbaseAPI = {
  fetchCandles,
};

export default CoinbaseAPI;
