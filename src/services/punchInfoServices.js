const events = require('events');
let eventEmitter = new events.EventEmitter();

class PunchInfoServices {
    constructor(){
        eventEmitter.on('createdEmployee' , createPunchInfo);
    }

    async createPunchInfo (data) {
        console.log(data);
    }

}

module.exports = PunchInfoServices;