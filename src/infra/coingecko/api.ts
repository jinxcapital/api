import fetch from 'node-fetch';

export type CoinGeckoListEntry = {
  id: string;
  symbol: string;
  name: string;
};

export type CoinGeckoListResponse = CoinGeckoListEntry[];

const fetchList = async (): Promise<CoinGeckoListResponse> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    const json = await response.json();

    if (Array.isArray(json)) {
      return json;
    }
  } catch (e) {
    return [];
  }

  return [];
};

export type CoinGeckoTopListEntry = {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  market_cap?: number;
  ath?: number;
  ath_date?: Date;
  current_price?: number;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  image?: string;
};
export type CoinGeckoTopListResponse = CoinGeckoTopListEntry[];

export const fetchTopList =
  async (): Promise<CoinGeckoTopListResponse | null> => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?` +
          new URLSearchParams({
            vs_currency: 'usd',
            per_page: '250',
          }),
      );
      return response.json();
    } catch {
      return null;
    }
  };

export type CoinGeckoResponse = {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  market_data?: {
    market_cap?: {
      usd?: number;
    };
    ath?: {
      usd?: number;
    };
    ath_date?: {
      usd?: Date;
    };
    current_price?: {
      usd?: number;
    };
    price_change_24h_in_currency?: {
      usd?: number;
    };
    price_change_percentage_24h_in_currency?: {
      usd?: number;
    };
    price_change_percentage_7d_in_currency?: {
      usd?: number;
    };
  };
  links?: {
    homepage?: string[];
  };
  image?: {
    large?: string;
  };
};

export const fetchById = async (
  id: string,
): Promise<CoinGeckoResponse | null> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?` +
        new URLSearchParams({
          localization: 'false',
          tickers: 'false',
          market_data: 'true',
          community_data: 'false',
          developer_data: 'false',
          sparkline: 'false',
        }),
    );
    return response.json();
  } catch {
    return null;
  }
};

const CoinGeckoAPI = {
  fetchList,
  fetchTopList,
  fetchById,
};

export default CoinGeckoAPI;
