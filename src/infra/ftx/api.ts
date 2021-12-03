import fetch from 'node-fetch';

interface FetchCandlesOptions {
  quote: string;
  base: string;
  startTime: Date;
  endTime: Date;
}

export type FTXEntry = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type FTXResponse = Array<FTXEntry>;

const fetchCandles = async (
  options: FetchCandlesOptions,
): Promise<FTXResponse> => {
  const startTime = Math.round(options.startTime.getTime() / 1000);
  const endTime = Math.round(options.endTime.getTime() / 1000);
  const pair = `${options.base}/${options.quote}`.toLowerCase();

  try {
    const response = await fetch(
      `https://ftx.com/api/markets/${pair}/candles?resolution=3600&start_time=${startTime}&end_time=${endTime}`,
    );

    const data = (await response.json()) as {
      success: boolean;
      result: FTXEntry[];
    };
    if (data.success) {
      return data.result;
    }
  } catch (e) {
    console.error(`infra/ftx/api error:`, e);

    return [];
  }

  return [];
};

const FTXAPI = {
  fetchCandles,
};

export default FTXAPI;
