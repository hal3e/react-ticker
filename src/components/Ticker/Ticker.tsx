import React, {useState, useEffect} from 'react'
import './style.scss'

export default function Ticker(): JSX.Element {
  const [items, setItems] = useState({
    rotating: ["A","B", "C", "D", "E"],
    songs: []
  })
  const [input, setInput] = useState("")

  const rotateElements = () => {
    setItems(pItems => {
      let elShifted = pItems.rotating.shift()
      if(pItems.songs.length > 0)
        pItems.rotating.push(pItems.songs.shift())
      else
        pItems.rotating.push(elShifted)
      return {...pItems}
    })
   }

  const onInputChange = (event:any) => {
    setInput(event.target.value)
   }

  useEffect(() => {
    const interval = setInterval(() => rotateElements(), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (input != ""){
      const delayDebounceFn = setTimeout(() => {
        fetch('https://itunes.apple.com/search?term=' + input)
        .then( res => res.json())
        .then( json => {
          setItems(pItems => ({...pItems, songs: [...new Set(json.results.map(j => j.collectionName).sort())].slice(0,5)}));
        }
        )
      }, 250)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [input])

  return (
    <div className="ticker">
      <input type="text" placeholder="Search Band" onChange={onInputChange}></input>
      <div className="card">
        {
          items.rotating.map((e,idx) => <div
          key={idx}
          className='item'
          >
          {e}
          </div>)
        }
      </div>
    </div>
  )
}
