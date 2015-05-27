"use strict";

const cluster = require('cluster');

module.exports = function attachPm2(skinny) {
    if (cluster.isWorker) {
        skinny.once('start', function sendOnlineOnStart() {
            process.send('online');
        });

        if (skinny.lifecycle) {
            process.on('message', function shutdownOnMessageFromPM2(message) {
                if (message === 'shutdown') {
                    skinny.lifecycle.shutdown();
                }
            });
        }
    }
};