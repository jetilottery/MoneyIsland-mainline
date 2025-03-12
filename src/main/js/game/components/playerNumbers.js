define(require => {
    const PIXI = require('com/pixijs/pixi');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const PlayerNumber = require('game/components/PlayerNumber');
    const bonusData = require('game/data/bonusData');
    const gameData = require('game/data/gameData');
    const winUpTo = require('game/components/winUpTo');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    require('com/gsap/TimelineMax');
    const Timeline = window.TimelineMax;

    let background = {}, foreground = {};

    let chests;
    let scenario;
    let coverAnimTimeline;
    let numChestsRemain = 8;

    let chestReferences = {
        'landscape': [3, 2, 4, 2, 5, 1, 5, 2, 3, 4, 2, 1, 2, 3, 4, 5],
        'portrait': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    };

    function idleManager(data) {
        switch (data.state) {
            case 'IdleAll':
                Tween.killTweensOf(promptIdle);
                stopIdle();
                //set the idle animations going on all unrevealed
                Tween.delayedCall(gameConfig.delayBeforeStartIdleInSeconds, promptIdle);
                break;
            case 'StopIdle':
                //stop the idle animations on all
                stopIdle();
                break;
        }
    }


    function init() {
        chests = [
            PlayerNumber.fromContainer(displayList.playerNumber1),
            PlayerNumber.fromContainer(displayList.playerNumber2),
            PlayerNumber.fromContainer(displayList.playerNumber3),
            PlayerNumber.fromContainer(displayList.playerNumber4),
            PlayerNumber.fromContainer(displayList.playerNumber5),
            PlayerNumber.fromContainer(displayList.playerNumber6),
            PlayerNumber.fromContainer(displayList.playerNumber7),
            PlayerNumber.fromContainer(displayList.playerNumber8),
            PlayerNumber.fromContainer(displayList.playerNumber9),
            PlayerNumber.fromContainer(displayList.playerNumber10),
            PlayerNumber.fromContainer(displayList.playerNumber11),
            PlayerNumber.fromContainer(displayList.playerNumber12),
            PlayerNumber.fromContainer(displayList.playerNumber13),
            PlayerNumber.fromContainer(displayList.playerNumber14),
            PlayerNumber.fromContainer(displayList.playerNumber15),
            PlayerNumber.fromContainer(displayList.playerNumber16),
        ];

        chests.forEach((c, i) => {
            c.chestRefPort = chestReferences['portrait'][i];
            c.chestRefLand = chestReferences['landscape'][i];
            c.initSpine();
            c.reset();
        });


        coverAnimTimeline = new Timeline({ repeat: -1 });

        // coverAnimTimeline.to({}, 2, {
        //     onComplete: () => {
        //         chests.forEach(chest => {
        //             chest.setSpineState({ state: 'IDLE', loop: false });
        //             chest.currentState = 'idle';
        //         });
        //     }
        // }, 0);

        // coverAnimTimeline.gotoAndStop(0);


        background.Land = new PIXI.spine.Spine(resLib.spine['BaseGame_BG'].spineData);
        background.Land.state.timeScale = 0.6;
        displayList.baseGameBG.addChild(background.Land);
        background.LandAnim = 'BaseGame_BG_IDLE';

        background.Port = new PIXI.spine.Spine(resLib.spine['PORT_BaseGame_BG'].spineData);
        background.Port.state.timeScale = 0.6;
        displayList.baseGameBG.addChild(background.Port);
        background.PortAnim = 'PORT_BaseGame_BG_IDLE';

        foreground.Land = new PIXI.spine.Spine(resLib.spine['BaseGame_FG'].spineData);
        displayList.baseGameFG.addChild(foreground.Land);
        foreground.LandAnim = 'BaseGame_FG_IDLE';

        foreground.Port = new PIXI.spine.Spine(resLib.spine['PORT_BaseGame_FG'].spineData);
        displayList.baseGameFG.addChild(foreground.Port);
        foreground.PortAnim = 'PORT_BaseGame_FG_IDLE';

        buttonMaxWidth();

        orientationChanged();
        msgBus.subscribe('GameSize.OrientationChange', orientationChanged);
    }

    function orientationChanged() {
        if (orientation.get() === orientation.LANDSCAPE) {
            background.Land.visible = true;
            foreground.Land.visible = true;
            background.Port.visible = false;
            foreground.Port.visible = false;
            background.Land.state.setAnimation(0, background.LandAnim, true);
            foreground.Land.state.setAnimation(0, foreground.LandAnim, true);
        } else {
            background.Land.visible = false;
            foreground.Land.visible = false;
            background.Port.visible = true;
            foreground.Port.visible = true;
            background.Port.state.setAnimation(0, background.PortAnim, true);
            foreground.Port.state.setAnimation(0, foreground.PortAnim, true);
        }
    }

    function promptIdle() {
        // Check if there are any remaining unrevealed chests
        const unrevealed = chests.filter(c => !c.revealed || (!c.revealed && !c.revealing));
        if (unrevealed.length === 0) {
            return;
        }

        coverAnimTimeline.kill();
        coverAnimTimeline.to({}, 2, {
            onStart: () => {
                const currentHovers = chests.filter(c => c.hovering);
                if (currentHovers.length === 0) {
                    const unrevealed = chests.filter(c => !c.revealed || (!c.revealed && !c.revealing));
                    for (let i = 0; i < unrevealed.length; i++) {
                        unrevealed[i].setSpineState({ state: 'IDLE', loop: false });
                        unrevealed[i].currentState = 'idle';
                    }
                }
            }
        });

        coverAnimTimeline.gotoAndPlay(0);
    }

    function stopIdle() {
        Tween.killTweensOf(promptIdle);
        // Check if there are any remaining unrevealed chests
        const unrevealed = chests.filter(number => !number.revealed);
        if (unrevealed.length === 0) {
            return;
        }

        coverAnimTimeline.gotoAndStop(0);
        for (let i = 0; i < unrevealed.length; i++) {
            unrevealed[i].setSpineState({ state: 'STATIC', loop: false });
        }
    }

    function populate(data) {
        scenario = data;
    }

    function enable() {
        // Start idle animations
        msgBus.publish('Game.IdleAll');
        winUpTo.switchToPicks();

        // Return an array of promises for each chest's lifecycle
        return chests.map(async chest => {
            // Enable the chest and wait for it to be revealed (manually or automatically)
            await chest.enable();

            numChestsRemain--;
            let finalReveal = chests.indexOf(chest);
            if (numChestsRemain < 1) {
                gameData.bgActive = false;
                msgBus.publish('UI.updateButtons', {
                    help: { enabled: false }
                });
                chests.forEach(c => {
                    if (!c.revealed && chests.indexOf(c) !== finalReveal) {
                        c.reveal();
                        c.revealed = true;
                        c.inactive = true;
                        c.setSpineState({ state: 'INACTIVE', loop: false });
                        // Tween.delayedCall(0.5, () => {
                        //     Tween.to(c, 0.5, { alpha: 0.4 });
                        // });
                    }
                });
            }

            winUpTo.updatePicks(numChestsRemain > 0 ? numChestsRemain : 0);

            // Get the next Winning Number
            const nextData = scenario.revealOrder.shift();
            const prizeVal = scenario.symbolPrizes[scenario.symbols.indexOf(nextData)];

            if (nextData) {
                audio.play('chest_reveal', false, 0.6);
                // Populate the chest with the next Player Number, ready to be uncovered
                chest.populate({ 'val': prizeVal, 'data': nextData });
                // Wait for the uncover animation (if animated)
                await chest.uncover();
                chest.symbolLetter = nextData; // We populate this after the uncover animation finishes so that when we check for match, it only triggers the win once
            }


            // Reset Idle
            if (!autoPlay._enabled) {
                idleManager({ state: 'IdleAll' });
            }
            // If the revealed number matches a revealed Winning Number then mark the match

            msgBus.publish('Game.PlayerNumber', nextData);
            await checkBonusTrigger(nextData, chest);
        });
    }

    function revealAll() {
        msgBus.publish('Game.StopIdle');
        // Get all the cards yet to be revealed
        const unrevealed = chests.filter(chest => !chest.revealed);
        shuffleArray(unrevealed);
        // Return an array of tweens that calls reveal on each card in turn
        return unrevealed.map(chest => Tween.delayedCall(0, chest.reveal, null, chest));
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function reset() {
        chests.forEach(chest => chest.reset());
        numChestsRemain = 8;
    }

    function buttonMaxWidth(){
        displayList.moveToMoneyButton.label.maxWidth = 240;
        displayList.autoPlayStartButton.label.maxWidth = 240;
        displayList.tryButton.label.maxWidth = 240;
        displayList.buyButton.label.maxWidth = 240;
    }

    async function checkBonusTrigger(playerNumber) {
        await new Promise(resolve => {
            const matchedChests = chests.filter(chest => chest.symbolLetter === playerNumber);
            if (playerNumber === '1' && matchedChests.length === 3) {
                //Cannon Bonus
                bonusData.islandBonus = true;
                resolve();
            } else if (playerNumber === '2' && matchedChests.length === 3) {
                //Cannon Bonus
                bonusData.cannonBonus = true;
                resolve();
            } else {
                // Loss or Prize, either way not a bonus
                resolve();
            }
        });
    }

    msgBus.subscribe('Game.IdleAll', () => {
        idleManager({ state: 'IdleAll' });
    });
    msgBus.subscribe('Game.StopIdle', () => idleManager({ state: 'StopIdle' }));

    return {
        init,
        enable,
        populate,
        revealAll,
        reset,
        _chests: () => { return chests; },

    };
});
