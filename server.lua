local lang = vRP.lang
local Luang = module("vrp", "lib/Luang")

local Discord = class("Discord", vRP.Extension)                    				

function Discord:__construct()                                    					
	vRP.Extension.__construct(self)
	
	self.cfg = module("vrp_discord", "cfg/cfg")	
	
end

function Discord:sendMsg(source, url, name, message)
	local discordPayload = {
		username = name,
		content = message
	}

	PerformHttpRequest(url, function(err, text, headers) end, 'POST', json.encode(discordPayload), { ['Content-Type'] = 'application/json' })
end

function Discord:events(self, user, event)
	local identity = vRP.EXT.Identity:getIdentity(user.cid)
	if identity then
		local name = identity.firstname .. " " .. identity.name
		local message
		if event == "join" then
			message = name .. " joined."
		elseif event == "death" then
			message = name .. " died."
		elseif event == "leave" then
			message = name .. " left."
		end
		self:sendMsg(user.source, self.cfg.channels.newsFeed.webhook, 'SYSTEM', message)
	end
end

Discord.event = {}

function Discord.event:playerSpawn(user, first_spawn)
	if first_spawn then
		self:events(self, user, "join")
	end
end

function Discord.event:playerDeath(user)
	self:events(self, user, "death")
end

function Discord.event:playerLeave(user)
	self:events(self, user, "leave")
end

vRP:registerExtension(Discord)                                   					
