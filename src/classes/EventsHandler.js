const {readdirSync} = require('fs');
const { COLORS } = require('./BotLogger');
const logger = require('./BotLogger');
class EventsHandler {
    constructor(eventsDir, client) {
        if(!eventsDir.endsWith('/')) eventsDir += '/';
        this._dir = eventsDir;
        this._client = client;
    }

    loadEvents() {
        const files = readdirSync(this._dir).filter(file => file.endsWith('.js'));
        for(const file of files) {
            try {
                require(this._dir + file)(this._client);
                logger.logMessage(`Adicionado event listener: &/${file}`, COLORS.CYAN, 'bold');
            }
            catch(e) {
                console.log(e);
                logger.logError(`Erro ao adicionar evento [${file}]`);
            }
        }
    }
}

module.exports = EventsHandler;
