import SongDetail from "../songDetail/page";

export default async function Detail({ params }: {params:any}) {
	const { id } = await params;
	return (
		<SongDetail id={parseInt(id)}></SongDetail>
	)
}
