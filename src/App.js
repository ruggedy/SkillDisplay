import React from 'react'
import listenActWebSocket, { AddWebsocketListener, ActWebSocketInit } from './ACTWebsocket'
import './css/App.css'
import Action from './Action'
import ActionCanvas from './ActionCanvas'
// import RotationContainer from './Rotation'
import ReactDOM from 'react-dom'
import { dummyData, imgData } from './utils';

export default function App () {
  // NOTE: unlike class state, useState doesn't do object merging; instead, it directly holds values

  React.useEffect(() => {
  	let ws = ActWebSocketInit()

  	return () => { ws.close() }
  }, [])

  return (
    <div className='container'>
      <ActionCanvas />

      {/* {encounterList.map((encounter, i) => (
				<RotationContainer key={i} encounterId={i} name={encounter.name} actionList={encounter.rotation} />
			))} */}
    </div>
  )
}
