# Role Select Bot
A drop-down based role select discord bot writen in discord.js.

There are three files you should edit before starting the bot:

- `config.json` - Add your bots token
- `message.txt` - Replace with the message you want to send with the role dropdown.
- `roles.json` - Put all the dropdowns in here (example below)

## `roles.json`
You should have a JSON array that looks something like the one below:

```json
[
    {
        "name": "My Roles",
        "options": [
            { "role": "933841152518545540", "emoji": "933841527858397225", "description": "cool role" },
            { "role": "933841218033561600", "emoji": "933841527858397225" }
        ],
        "min": 0,
        "max": 1
    }
]
```

`name` is the text you want to display.

`options` are the roles that you want to be selectable, containing the role and emoji IDs

`min` and `max` are omitable unless you want to limit the roles that can be chosen or removed.

`description` displays under the role option