const mineflayer = require('mineflayer')
const http = require('http')

const bot = mineflayer.createBot({
  host: "myworldgbgat.aternos.me",   // ← TROQUE pelo IP do seu servidor
  port: 62351,                       // ← TROQUE se sua porta for diferente
  username: "xTheusz_AFKBot",
  version: false,
  auth: "offline"
})

function antiAFK() {
  if (!bot.entity) return
  const movements = [
    () => bot.setControlState('forward', true),
    () => bot.setControlState('back', true),
    () => bot.setControlState('jump', true),
    () => bot.look(Math.random() * Math.PI * 2, 0)
  ]
  setInterval(() => {
    const randomAction = movements[Math.floor(Math.random() * movements.length)]
    randomAction()
    setTimeout(() => {
      bot.setControlState('forward', false)
      bot.setControlState('back', false)
      bot.setControlState('jump', false)
    }, 1500)
  }, 8000)
}

bot.on('login', () => {
  console.log(`✅ Bot ${bot.username} entrou!`)
  antiAFK()
})

bot.on('spawn', () => {
  console.log('🤖 Bot spawnou no mundo!')
  bot.chat('Bot Anti-AFK online!')
})

bot.on('kicked', (reason) => console.log('Kickado:', reason))
bot.on('error', (err) => console.log('Erro:', err.message))
bot.on('end', () => {
  console.log('🔄 Reconectando...')
  setTimeout(() => process.exit(1), 10000)
})

// Servidor web para Render
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot Anti-AFK está vivo!')
})

server.listen(3000, () => {
  console.log('🌐 Servidor web rodando na porta 3000')
})
