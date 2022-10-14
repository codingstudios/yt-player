const ytdl = require('ytdl-core');
const fs = require('fs');
const yts = require('yt-search');
const ffmpeg = require('fluent-ffmpeg');
var content = ``;

const music = fs.readdirSync('./music').filter(file => file.endsWith('.mp3'));
const html = fs.readFileSync('./index.html');

music.forEach(async (file) => {
  try {
    const video = await yts(file.slice(0, -4));
    const stream = ytdl(video?.all[0].url, { filter: 'audioonly' });
    content += `<audio controls src="./music/${file}"></audio>`;
    fs.writeFileSync("./index.html", content)
    const stats = fs.statSync(`./music/${file}`);
    const fileSizeInBytes = stats.size;
    const size = fileSizeInBytes / (1024*1024);
    if(size > 1) return;
    ffmpeg(stream)
          .audioBitrate(128)
          .format('mp3')
          .save(fs.createWriteStream(`./music/${file}`, { flags: 'a' }));
  }catch(e) {console.log(e)}
})

