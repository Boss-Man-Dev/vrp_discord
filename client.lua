--##########	VRP Main	##########--
-- init vRP server context
Tunnel = module("vrp", "lib/Tunnel")
Proxy = module("vrp", "lib/Proxy")

local cvRP = module("vrp", "client/vRP")
vRP = cvRP()

local pvRP = {}
-- load script in vRP context
pvRP.loadScript = module
Proxy.addInterface("vRP", pvRP)

local cfg = module("vrp_discord", "cfg/cfg")         	
local Discord = class("Discord", vRP.Extension)           

function Discord:__construct()                            	
	vRP.Extension.__construct(self)
end
  
Discord.tunnel = {}


vRP:registerExtension(Discord)                            	