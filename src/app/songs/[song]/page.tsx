const decodeName = (name: string) => {
  const newName = name.replaceAll("-", " ");
  return newName;
};
/* eslint-disable */
async function Songs({ params }: {params:any}) {
  if(params.song == 'favicon.ico')return <small hidden></small>
  const res = await fetch(`http://localhost:3000/api/songs/${params.song}`);
  const song = await res.json();
  
  if(!song || song?.status === 'error'){
    return <h1>Cancion no encontrada</h1>
  }
  song.name = decodeName(song?.name);
  
  return (
    <div>
      <h1 className="w-full text-center p-2 text-xl capitalize underline-offset-1">{song.id}- {song.name}</h1>
      <div className="w-full flex justify-center mb-5" dangerouslySetInnerHTML={{ __html: song.letter }}></div>
    </div>
  );
}
export default Songs;
