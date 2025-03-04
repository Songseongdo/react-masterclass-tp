const BASE_URL = "https://api.coinpaprika.com/v1";
const H_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export function fetchCoins() {
	return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export function fetchCoinInfo(coinId: string) {
	return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export function fetCoinTickers(coinId: string) {
	return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

export function fetCoinHistory(coinId: string) {
	return fetch(`${H_URL}/?coinId=${coinId}`).then((res) => res.json());

	// const endDate = Math.floor(Date.now() / 1000);
	// const startDate = endDate - 60 * 60 * 24 * 7;
	// return fetch(
	// 	`${H_URL}/?coinjId=${coinId}&start=${startDate}&end=${endDate}`
	// ).then((res) => res.json());
}
