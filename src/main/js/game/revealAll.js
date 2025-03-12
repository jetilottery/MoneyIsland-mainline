define(require => {
    const Timeline = require('com/gsap/TimelineLite');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    const playerNumbers = require('game/components/playerNumbers');
    const cannonBonus = require('game/components/cannonBonus');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    let revealAllTimeline;
    let revealAllTimelineCB;
    let autoPlayActive = false;

    function startBG() {
        const revealPlayer = playerNumbers.revealAll();

        displayList.playerNumbers.interactiveChildren = false;

        //Then the player numbers
        revealAllTimeline = new Timeline({
            tweens: [
                new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
            ],
            align: 'sequence'
        });

        return revealAllTimeline;
    }

    function stopBG() {
        // re-enable all interaction at the parent container level
        displayList.playerNumbers.interactiveChildren = true;
        // kill the revealAll timeline if active
        if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        }
        else if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        }
    }

    /**
     * COIN BONUS REVEAL FUNCTIONALITY
     */
    function startCB() {
        const revealPlayer = cannonBonus.revealAll();

        revealAllTimelineCB = new Timeline();
        displayList.cannonBonus.interactiveChildren = false;

        //Then the player numbers
        revealAllTimelineCB = new Timeline({
            tweens: [
                new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayCannonBonusInterval }),
            ],
            align: 'sequence'
        });
        return revealAllTimelineCB;
    }

    function stopCB() {
        // re-enable all interaction at the parent container level
        displayList.cannonBonus.interactiveChildren = true;
        // kill the revealAll timeline if active
        if (revealAllTimelineCB) {
            revealAllTimelineCB.kill();
            revealAllTimelineCB = undefined;
        }
    }

    function start(gameType) {
        gameType === 'baseGame' ? startBG() : startCB();
        autoPlayActive = true;
        msgBus.publish('UI.updateButtons', {
            autoPlay: { visible: false },
        });
    }

    function stop(gameType) {
        gameType === 'baseGame' ? stopBG() : stopCB();
        autoPlayActive = false;
    }

    function reset() {
        autoPlayActive = false;
    }

    return {
        start,
        stop,
        reset,
        autoPlayActive,
    };
});
