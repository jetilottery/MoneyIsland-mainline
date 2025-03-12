define(function (require) {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const playerNumbers = require('game/components/playerNumbers');
    const bonusController = require('game/components/bonusController');
    const revealAll = require('game/revealAll');
    const bonusData = require('game/data/bonusData');

    const gameData = require('game/data/gameData');

    async function startReveal() {
        gameData.reset();
        // Enable all of the winning numbers and player numbers, wait until they are all revealed

        await Promise.all([
            ...playerNumbers.enable()
        ]);

        gameData.bgActive = false;

        revealAll.stop(gameData.activeGame);

        if (bonusData.cannonBonus && !bonusController.cannonBonusDone()) {
            autoPlay._enabled = false; //turn off autoplay 

            await bonusController.startCannonBonus();
        }

        revealAll.stop(gameData.activeGame);

        if (bonusData.islandBonus && !bonusController.islandBonusDone()) {
            autoPlay._enabled = false; //turn off autoplay 

            msgBus.publish('UI.updateButtons', {
                autoPlay: false,
                ticketSelect: false,
                help: false
            });

            await bonusController.startIslandBonus();
        }

        gameFlow.next('REVEAL_COMPLETE');

        // continue to the next state
    }

    // Listen for autoplay activation which triggers the remaining cards to reveal automatically
    msgBus.subscribe('Game.AutoPlayStart', () => {
        revealAll.start(gameData.activeGame);
    });

    // Listen for autoplay deactivation which cancels the revealAll timeline
    msgBus.subscribe('Game.AutoPlayStop', () => {
        revealAll.stop(gameData.activeGame);
    });

    gameFlow.handle(startReveal, 'START_REVEAL');
});
