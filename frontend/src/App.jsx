import React, { useEffect, useState, useRef } from 'react'

export default function App(){
  const [tracks, setTracks] = useState([])
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(()=>{
    fetch('http://localhost:5000/api/tracks')
      .then(r=>r.json())
      .then(d=>setTracks(d.tracks))
  }, [])

  useEffect(()=>{
    if (!audioRef.current) return;
    audioRef.current.load()
    if (playing) audioRef.current.play().catch(()=>setPlaying(false))
  }, [index, playing])

  function playTrack(i){
    setIndex(i)
    setPlaying(true)
  }

  function next(){ setIndex((index+1) % tracks.length); setPlaying(true) }
  function prev(){ setIndex((index-1+tracks.length) % tracks.length); setPlaying(true) }

  const filtered = tracks.filter(t=>{
    const q = query.toLowerCase()
    return !q || (t.title && t.title.toLowerCase().includes(q)) || (t.artist && t.artist.toLowerCase().includes(q))
  })

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center"> 
            <span className="text-sm text-gray-500">Album Art</span>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">{tracks[index]?.title || 'No track'}</h3>
            <p className="text-sm text-gray-500">{tracks[index]?.artist || ''}</p>
          </div>
          <div className="mt-4 flex items-center space-x-3">
            <button onClick={prev} className="px-3 py-2 rounded-xl border">Prev</button>
            <button onClick={()=>{
              setPlaying(prev => !prev)
              if (audioRef.current) audioRef.current.play().catch(()=>setPlaying(false))
            }} className="px-4 py-2 rounded-xl bg-indigo-600 text-white">{playing ? 'Pause':'Play'}</button>
            <button onClick={next} className="px-3 py-2 rounded-xl border">Next</button>
          </div>
          <div className="w-full mt-4">
            <input type="range" min={0} max={duration||0} value={pos} onChange={(e)=>{audioRef.current.currentTime = e.target.value; setPos(Number(e.target.value))}} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{new Date((pos||0)*1000).toISOString().substr(14,5)}</span>
              <span>{new Date((duration||0)*1000).toISOString().substr(14,5)}</span>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="mb-4">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title or artist" className="w-full p-3 border rounded-lg" />
          </div>

          <div className="overflow-y-auto max-h-96">
            <ul>
              {filtered.map((t,i)=> (
                <li key={i} className={`p-3 rounded-lg mb-2 flex justify-between items-center ${i===index ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-gray-500">{t.artist || t.album || ''}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={()=>playTrack(i)} className="px-3 py-1 rounded border">Play</button>
                    <a href={`http://localhost:5000/stream/${encodeURIComponent(t.file)}`} download className="text-xs underline">Download</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={tracks[index] ? `http://localhost:5000/stream/${encodeURIComponent(tracks[index].file)}` : undefined}
          onTimeUpdate={(e)=>setPos(Math.floor(e.target.currentTime))}
          onLoadedMetadata={(e)=>setDuration(Math.floor(e.target.duration))}
          onEnded={()=>next()}
          hidden
        />
      </div>
    </div>
  )
}