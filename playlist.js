const ytdl = require('ytdl-core');
const fs = require('fs');
const yts = require('yt-search');
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');

(async () => {
  try {
    exec('cat music/snug.mp3');
    const video = await yts(`snug fireflies`);
    const stream = ytdl(video?.all[0].url, { filter: 'audioonly' });
    ffmpeg(stream)
          .audioBitrate(128)
          .format('mp3')
          .save(fs.createWriteStream(`./music/snug.mp3`, { flags: 'a' }));
  }catch(e) {console.log(e)}
})()

