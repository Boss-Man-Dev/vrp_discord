fx_version "adamant"
games {"gta5"}

description "discord bot"


-- server scripts
server_scripts {
  "@vrp/lib/utils.lua",
  "src/index.js",
  "vrp.lua"
}

client_scripts {
  "@vrp/lib/utils.lua",
  'client.lua',
}

-- client files
files {
  "cfg/cfg.lua",
  "src/utils/areCommandsDifferent.js",
  "src/utils/connectDatabase.js",
  "src/utils/getAllFiles.js",
  "src/utils/getApplicationCommands.js",
  "src/utils/getLocalCommands.js",
  "src/utils/permissionCheck.js",
}
