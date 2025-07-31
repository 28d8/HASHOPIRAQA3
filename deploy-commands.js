const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// انسخ القيم من index.js
const token = 'MTM5OTc5NDQ1MDEyNDkwMjYyMQ.GxLZfd.BmAJnOW20Dld4BYSdacsDj9JFo3baE1MkWcIow';
const clientId = '1399817743087435947';

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`❌ الأمر ${file} لا يحتوي على data أو execute`);
  }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('🚀 جاري تسجيل أوامر السلاش ...');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );

    console.log('✅ تم تسجيل أوامر السلاش بنجاح!');
  } catch (error) {
    console.error('❌ خطأ أثناء تسجيل الأوامر:', error);
  }
})();