

const IOUtis = {

    clientRunUp: (socket) => {
        socket.emit('clientRunUp', global.IOCore.Packet.clientRunUp());
    },

    spawnEntity: (entity) => {
        if (global.Server.addEntity(entity)) {
            global.IOCore.io.emit('spawnEntity', entity.generatePacket());
        }
    },

    despawnEntity: (id) => {
        if (global.Server.globalEntityMap.has(id)) {

            let entity = global.Server.globalEntityMap.get(id);
            entity.onDespawn();

            global.Server.removeEntityById(id);
            global.IOCore.io.emit('despawnEntity', id);
        }
    },

    clientEntityMapUpdate: () => {
        global.IOCore.io.emit('clientEntityMapUpdate', global.IOCore.Packet.clientEntityMapUpdate());
    },

    bindCamera: (socket, eID, dX, dY, dZ) => {

        socket.emit('bindCamera', global.IOCore.Packet.bindCamera({
            eID: eID,
            dX: dX || 0,
            dY: dY || 0,
            dZ: dZ || 0
        }));

    }
};


module.exports = IOUtis;