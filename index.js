// تحميل المكتبات والملفات الضرورية
const { readdirSync, statSync, fs } = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({
intents: 0x31feff,
partials: ['CHANNEL', 'GUILD_MEMBER', 'USER'],
allowedMentions: {
parse: ['roles', 'users', 'everyone'],
repliedUser: true,
},
});
const {
Intents,
Collection,
Client,
GuildMember,
MessageActionRow,
WebhookClient,
MessagePayload,
GatewayIntentBits,
MessageSelectMenu,
Modal,
MessageEmbed,
MessageButton,
MessageAttachment,
Permissions,
TextInputComponent,
} = require('discord.js');
const chalk = require('chalk');
const { CommandCooldown, msToMinutes } = require('discord-command-cooldown');
const ms = require('ms');
const paypal = require('paypal-rest-sdk');
const { Database, MongoDriver, JSONDriver } = require('st.db');

// تهيئة قواعد البيانات
const options = { driver: new JSONDriver('./database/database.json') };
const options2 = { driver: new JSONDriver('./database/Tickets.json') };
const options3 = { driver: new JSONDriver('./database/TicketCount.json') };
const options4 = { driver: new JSONDriver('./database/Points.json') };
const options5 = { driver: new JSONDriver('./database/ClosedTicket.json') };
const db = new Database(options);
const dbTickets = new Database(options2);
const TC = new Database(options3);
const dbpoint = new Database(options4);
const dbCloseTicket = new Database(options5);

// تحميل الإعدادات
const settings = require('./config/settings.js');
const app = require('./function/Express.js')(settings.port, chalk);
const prefix = settings.prefix;

// تصدير الملفات والمتغيرات
module.exports = {
app,
client,
db,
prefix,
dbpoint,
dbCloseTicket,
dbTickets,
TC,
settings,
};

// تحميل الوظائف الإضافية
require('./function/function/ready.js')(client);
const initializeCommands = require('./function/commands.js');
initializeCommands();
// تهيئة المسارات
app.set('views', './views');
app.set('view engine', 'ejs'); 
// معالجة الأخطاء
const logAndReturn = (error) => console.log(error);
process.on('unhandledRejection', logAndReturn);
process.on('uncaughtException', logAndReturn);
process.on('multipleResolves', logAndReturn);
process.on('uncaughtExceptionMonitor', logAndReturn);

// تسجيل الدخول للبوت
client.login(''); // استبدل YOUR_BOT_TOKEN بالتوكين الخاص ببوتك
const clientId = '1399817743087435947';
// اوامر بيرفكس
if (message.content.startsWith(prefix) && !message.author.bot) {
  const args = message.content.slice(prefix.length).trim().split(/2+/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('❌ صار خطأ.');
  }
}
// برضو اوامر بيفكس
client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}
// إعداد أوامر Slash عند تشغيل البوت
client.on('ready', async () => {
await client.application.commands.set([
{
name: 'تحذير البائع',
type: 'MESSAGE',
},
{
name: 'remove',
description: 'To remove a scammer from scammers list',
options: [
{
name: 'user',
description: 'Id of the scammer',
type: 3,
required: true,
},
],
},
{
name: 'check',
description: 'To check if a member is a scammer',
options: [
{
name: 'user',
description: 'Id of the member',
type: 3,
required: true,
},
],
},
]);
}); 
//------------------//
client.on('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

    });