import { Link } from "react-router-dom";
import styled from "styled-components";
// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../state/atom";

const Container = styled.div``;

const Header = styled.header`
	max-width: 500px;
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	margin: 0 auto;
`;

const CoinsList = styled.ul`
	padding: 0px 20px;
	max-width: 500px;
	margin: 0 auto;
`;

const Coin = styled.li`
	background-color: ${(props) => props.theme.cardBgColor};
	color: ${(props) => props.theme.textColor};

	margin-bottom: 10px;
	border-radius: 15px;
	border: 1px solid white;

	a {
		padding: 20px;
		transition: color 0.2s ease-in;
		display: flex;
		align-items: center;
	}

	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
	font-size: 30px;
`;
const ToggleButton = styled.button`
	position: absolute;
	right: 40px;
	top: 45%;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

const Img = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 10px;
`;

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((prv) => !prv);

	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
				<ToggleButton onClick={toggleDarkAtom}>
					Toggle Mode
				</ToggleButton>
			</Header>
			{isLoading ? (
				"Loading..."
			) : (
				<CoinsList>
					{data?.slice(0, 5).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}/chart`,
									state: { name: coin.name },
								}}
							>
								<Img
									src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
									alt="aa"
								></Img>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
