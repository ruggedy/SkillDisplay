import React, { useEffect, useState, useLayoutEffect } from 'react'
import { AddWebsocketListener } from './ACTWebsocket'
import { imgData, roundToTwo, AnimationController, dummyData } from './utils'

import './css/Action.css'
import Action from './Action'

const ignoredCodes = new Set(['00', '01', '02', '33'])

const cachedData = new Map([])
export default function ActionCanvas ({ gcdIconSize = 60, ogcdIconsize = 48 }) {
  const [actionList, setActionList] = useState([])

  useLayoutEffect(() => {
    let selfId

    function handler (data, code) {
      if (ignoredCodes.has(code)) return

      if (data.charID) {
        selfId = data.charID.toString(16).toUpperCase()
        return
      }

      if (selfId === undefined) return

      const [
        ,
        logTimestamp,
        logCharIdHex,
        ,
        logActionIdHex,
        action
      ] = data.split('|')

      if (logCharIdHex !== selfId) return
      if (action !== 'Attack') {
        const actionData = imgData(action) && { ...imgData(action) }

        if (!actionData) return

        const { type, dataUri } = actionData
        // console.log(action, dataUri)
        const iconSize = type === 'gcd' ? gcdIconSize : ogcdIconsize
        const track = type === 'gcd' ? 'track-2' : 'track-1'
        // setActionList(actionList =>
        //   actionList.concat({ type, dataUri, iconSize, track })
        // )

        //     <img
        // 	style={{width: iconSize}}
        // 	className={`${track} action-move`}
        // 	src={url}
        // 	// alt={apiData.Name || ''}
        // />
        const iconImg = document.createElement('img')
        iconImg.src = dataUri
        iconImg.setAttribute('style', `width: ${iconSize}px;`)
        iconImg.setAttribute('class', `${track} action-move`)
        const parentElem = document.getElementById('action-container')
        parentElem.appendChild(iconImg)
        // iconImg.onload = function () {
        // }
      }
    }

    // dummyData.forEach((data, idx) =>
    //   setTimeout(() => handler(data), (idx + 1) * 2000)
    // )

    AddWebsocketListener(handler)
  }, [])

  return (
    <div id='action-container' className='actions-5'>
      {/* {actionList.map(({ action, dataUri, ...props }, idx) => (
        <Action key={`${action}-${idx}`} url={dataUri} {...props} />
      ))} */}
    </div>
  )
}
