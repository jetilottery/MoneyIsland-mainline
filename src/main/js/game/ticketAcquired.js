define((require) => {
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    const playerNumbers = require('game/components/playerNumbers');
    const cannonBonus = require('game/components/cannonBonus');
    const islandMeter = require('game/components/islandMeter');


    function ticketAcquired() {
        playerNumbers.populate(scenarioData.scenario);
        cannonBonus.populate(scenarioData.scenario);
        islandMeter.populate(scenarioData.scenario);

        audio.play('BG_music', true);

        gameFlow.next('START_REVEAL');
    }

    gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});
