define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const cannonBonus = require('game/components/cannonBonus');
    const islandBonus = require('game/components/islandBonus');
    const transition = require('game/components/transition');

    const gameData = require('game/data/gameData');
    const gameTypes = gameData.gameTypes;

    let cannonBonusStatus, islandBonusStatus;

    function reset() {
        cannonBonusStatus = 'INACTIVE';
        islandBonusStatus = 'INACTIVE';
    }

    async function startCannonBonus() {
        gameData.activeGame = gameTypes[1];

        msgBus.publish('UI.updateButtons', {
            autoPlay: false,
            ticketSelect: false,
            help: false
        });

        await transition.to('cannonBonus', gameConfig.delayBeforeTransitionToBonus);

        msgBus.publish('UI.updateButtons', {
            help: { enabled: true }
        });

        cannonBonus.start();

        await Promise.all([
            ...cannonBonus.enable()
        ]);

        cannonBonusStatus = 'FINISHED';

        await transition.to('baseGame', gameConfig.bonusHoldOnCompleteWin);

        msgBus.publish('Game.AutoPlayStop'); // Stop Cannon Bonus Reveal all 

        gameData.activeGame = gameTypes[0];

        if (gameData.bgActive) {
            msgBus.publish('UI.updateButtons', {
                autoPlay: true,
                ticketSelect: true,
            });
        }
    }

    async function startIslandBonus() {
        gameData.activeGame = gameTypes[2];

        msgBus.publish('UI.updateButtons', {
            autoPlay: false,
            ticketSelect: false,
            help: false
        });

        await transition.to('islandBonus', gameConfig.delayBeforeTransitionToBonus);

        msgBus.publish('UI.updateButtons', {
            help: { enabled: true }
        });

        await islandBonus.startBonus();

        islandBonusStatus = 'FINISHED';

        await transition.to('baseGame', gameConfig.bonusHoldOnCompleteWin);
        gameData.activeGame = gameTypes[0];

        if (gameData.bgActive) {
            msgBus.publish('UI.updateButtons', {
                autoPlay: true,
                ticketSelect: true,
            });
        }
    }

    function cannonBonusDone() {
        return cannonBonusStatus === 'FINISHED';
    }

    function islandBonusDone() {
        return islandBonusStatus === 'FINISHED';
    }

    return {
        init: reset,
        reset: reset,
        startCannonBonus,
        startIslandBonus,
        cannonBonusDone,
        islandBonusDone
    };
});