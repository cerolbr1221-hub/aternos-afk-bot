const mineflayer = require('mineflayer')
const http = require('http')

const bot = mineflayer.createBot({
  host: "myworldgbgat.aternos.me",     // ← Confirme se este é o IP correto
  port: 62351,                         // ← Confirme a porta
  username: "xTheusz_AFKBot",
  version: false,
  auth: "offline"
})

console.log("🔄 Tentando conectar ao servidor...")

bot.on('login', () => {
  console.log(`✅ Bot ${bot.username} entrou com sucesso!`)
})

bot.on('spawn', () => {
  console.log('🤖 Bot spawnou no mundo!')
  bot.chat('Bot Anti-AFK online!')
})

bot.on('kicked', (reason) => {
  console.log('❌ Foi kickado:', reason)
})

bot.on('error', (err) => {
  console.log('❌ Erro:', err.message)
})

bot.on('end', () => {
  console.log('🔄 Conexão fechada. Reconectando...')
  setTimeout(() => process.exit(1), 10000)
})

// Servidor web
const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('Bot Anti-AFK está vivo!')
})

server.listen(3000, () => {
  console.log('🌐 Web server rodando na porta 3000')
})
