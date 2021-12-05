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

export type CoinGeckoResponse = {
  id: string;
  symbol: string;
  name: string;
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
  fetchById,
};

export default CoinGeckoAPI;