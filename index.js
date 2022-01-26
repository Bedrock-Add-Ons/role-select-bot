const fs = require('fs')
const { Client, Intents, MessageActionRow, MessageSelectMenu, Permissions } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const config = require('./config.json')
const roleConfig = require('./roles.json')

client.once('ready', () => {
    console.log('Ready!')
})

client.on("messageCreate", message => { 
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
    if (message.content == "!createSelectRoles") {

        const rows = []
        for (selecConNum in roleConfig) {
            const selectConfig = roleConfig[selecConNum]
            const OptionsArray = []
            for (rolenum in selectConfig.options) {
                const role = selectConfig.options[rolenum]
                OptionsArray.push({ "label": message.guild.roles.cache.get(role.role).name, "value": message.guild.roles.cache.get(role.role).id })
                if (role.emoji) OptionsArray[rolenum].emoji = role.emoji
                if (role.description) OptionsArray[rolenum].description = role.description
            }

            const minValues = selectConfig.min ? selectConfig.min : 0
            const maxValues = selectConfig.max ? selectConfig.max : selectConfig.options.length

            const Row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .addOptions(OptionsArray)
                    .setCustomId(`${selecConNum}`)
                    .setMinValues(minValues)
                    .setMaxValues(maxValues)
                    .setPlaceholder(selectConfig.name)
            )
            rows.push(Row)
        }
        message.channel.send({
            content: fs.readFileSync("./message.txt") + " ",
            components: rows
        })
    }

})

client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return
    const reactionRoles = roleConfig[interaction.customId].options.map(x => x.role)
    const currentRoles = interaction.member._roles
    const selectedRoles = interaction.values
    const remove = reactionRoles.filter(x => currentRoles.includes(x))

    if (remove.length > 0) for (role of remove) { interaction.member.roles.remove(role) }
    if (selectedRoles.length > 0) for (role of selectedRoles) { interaction.member.roles.add(role) }
    interaction.deferUpdate()
})

client.login(config.token)