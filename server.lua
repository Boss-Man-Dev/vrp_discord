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

Discord.event = {}

function Discord.event:playerSpawn(user, first_spawn)
	if first_spawn then
		local identity = vRP.EXT.Identity:getIdentity(user.cid)
		local name = identity.firstname .. " " .. identity.name

		self:sendMsg(user.source, self.cfg.channels.newsFeed.webhook, 'SYSTEM', name .. ' joined.')
	end
end

function Discord.event:playerDeath(user)
	local identity = vRP.EXT.Identity:getIdentity(user.cid)
	local name = identity.firstname .. " " .. identity.name

	self:sendMsg(user.source, self.cfg.channels.newsFeed.webhook, 'SYSTEM', name .. ' died.')
end

function Discord.event:playerLeave(user)
	local identity = vRP.EXT.Identity:getIdentity(user.cid)
	local name = identity.firstname .. " " .. identity.name

	self:sendMsg(user.source, self.cfg.channels.newsFeed.webhook, 'SYSTEM', name .. ' left.')
end

-- cfx 

--[[
local function sendMsg(source, url, name, message)
	local discordPayload = {
		username = name,
		content = message
	}

	PerformHttpRequest(url, function(err, text, headers) end, 'POST', json.encode(discordPayload), { ['Content-Type'] = 'application/json' })
end

function GetCharacterId(player)
    local identifiers = GetPlayerIdentifiers(player)
    for _, identifier in ipairs(identifiers) do
        -- Assuming the character ID is stored in an identifier called "steam" or "license"
        if string.find(identifier, "steam:") or string.find(identifier, "license:") then
            local parts = split(identifier, ":")
            local characterId = parts[2]
            return characterId
        end
    end
    return nil
end

AddEventHandler('playerSpawn', function(user, first_spawn)
	if first_spawn then
		sendMsg(user.source, self.cfg.channels.newsFeed.webhook, 'SYSTEM', name .. ' joined.')
	end
end)

AddEventHandler('playerDeath', function(user)
	sendMsg(user.source, self.cfg.channels.newsFeed.webhook, 'SYSTEM', name .. ' died.')
end)

AddEventHandler('playerDropped', function(user)
	sendMsg(user.source, self.cfg.channels.newsFeed.webhook, 'SYSTEM', name .. ' left.')
end)
]]--

vRP:registerExtension(Discord)                                   					