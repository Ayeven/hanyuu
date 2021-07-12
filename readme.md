# genericbot
A not so simple modular example of discord.js v13(under development as I'm writing this) with the new @discordjs/voice pacakge

For starter this is a small bot that I made so I can practice learning javascript, specifically more into nodejs.

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
 - `node` [Version 14 or 16 required](https://nodejs.org)
* Core Dependencies

    These are dependencies that should definitely be available.
    * @discordjs/voice: ^0.5.0
    * prism-media: ^1.2.9
    
- Opus Libraries

    If you want to play audio from many different file types, or alter volume in real-time, you will need to have one of these.
    - @discordjs/opus:^0.5.3
    - opusscript

- Encryption Libraries

    You should have at least one encryption library installed to use
    - sodium: ^3.x
    - libsodium-wrappers
    - tweetnacl

- FFmpeg

    If you want to play audio from many different file types, you will need to have FFmpeg installed.
    If `libopus` is enabled, you will be able to benefit from increased performance if real-time volume alteration is disabled.
    As this example uses `youtube-dl` FFmpeg must be installed in your environment
    - version: ^4.x
    - libopus

    >Tips:
    Outside a development environment, it is recommended for you to use `@discordjs/opus` and `sodium` to improve performance and improve the stability of audio playback!
If you're struggling to install these dependencies, make sure you have build tools installed first. On Windows, this is as easy as running `npm install --global --production --vs2015 --add-python-to-path windows-build-tools`!

You also need your bot's token. This is obtained by creating an application in
the [Developer section](https://discord.com/developers) of discord.com. Check the [first section of this page](https://anidiots.guide/getting-started/the-long-version.html) 
for more info.


## Intents

By default `generic-bot` needs the Guilds, Guild Messages and Guild Voice States intents to work.
Command(s) may not working without proper intent.

For more info about intents checkout the [official Discord.js guide page](https://discordjs.guide/popular-topics/intents.html) and the [official Discord docs page](https://discord.com/developers/docs/topics/gateway#gateway-intents).

