import { useQuery } from "react-query";
import { fetCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../state/atom";

interface IChartProps {
	coinId: string;
}
interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function Chart({ coinId }: IChartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetCoinHistory(coinId));
	const isDark = useRecoilValue(isDarkAtom);

	console.log(data?.map((price) => price.close));

	return (
		<>
			{isLoading ? (
				"Loading chart..."
			) : (
				<ApexChart
					type="line"
					series={[
						{
							name: "price",
							data: data?.map((price) => price.close) ?? [],
						},
					]}
					options={{
						theme: {
							mode: isDark ? "light" : "dark",
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "tarnsparent",
						},
						grid: {
							show: false,
						},
						stroke: {
							curve: "smooth",
							width: 5,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							labels: {
								show: false,
							},
							axisTicks: {
								show: false,
							},
							axisBorder: {
								show: false,
							},
							type: "datetime",
							categories: data?.map((date) => date.time_close),
						},
						fill: {
							type: "gradient",
							gradient: {
								gradientToColors: ["#0be881"],
								stops: [0, 100],
							},
						},
						colors: ["red"],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</>
	);
}

export default Chart;
