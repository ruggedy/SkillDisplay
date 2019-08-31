const handleCodes = new Set([
	'00',
	'01',
	'02',
	'21',
	'22',
	'33'
])

const HOST_PORT = 'ws://192.168.1.224:10501/'


const listeners = new Set([])

function createWebsocketConn () {
  const url = new URLSearchParams(window.location.search)
  const wsUri = `${HOST_PORT}BeforeLogLineRead` || undefined
  // const wsUri = `${url.get("HOST_PORT")}BeforeLogLineRead` || undefined
  const ws = new WebSocket(wsUri)
  ws.onerror = () => ws.close()
  ws.onclose = () => setTimeout(() => { createWebsocketConn() }, 1000)
  ws.onmessage = function(e, m) {
    if (e.data === ".") return ws.send(".") //PING
    const obj = JSON.parse(e.data);
    for (const listener of listeners.values()) {
      if (obj.msgtype === "SendCharName") {
        return listener(obj.msg, null)
      } else if (obj.msgtype === "Chat") {
        const code = obj.msg.substring(0, 2) //first 2 numbers POG
        if (handleCodes.has(code)) return listener(obj.msg, code) //NetworkAbility or NetworkAoeAbility
      }
    }
  }
  return ws
}
export function ActWebSocketInit () {
  return createWebsocketConn()
}
export function AddWebsocketListener( callback ) {
  listeners.add(callback)
}
