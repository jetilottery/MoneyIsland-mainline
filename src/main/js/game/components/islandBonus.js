define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const islandBG = require('game/components/islandBG');
    const islandMeter = require('game/components/islandMeter');
    const islandScroll = require('game/components/islandScroll');
    const bonusData = require('game/data/bonusData');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let nextLvl;
    let endBonus;

    function init() {
        islandBG.init();
        islandMeter.init();
        islandScroll.init();

        displayList.islandBonus.visible = false;
        displayList.islandScrollButton.visible = false;
        displayList.islandScrollButton.enabled = false;

        displayList.islandScrollButton.on('press', () => {
            audio.play('click');
            autoPick();

            msgBus.publish('UI.updateButtons', {
                help: { enabled: false },
            });

            bonusData.islandData.squares.forEach(sq => {
                sq.stopIdle();
                sq.enabled = false;
            });
            displayList.islandScrollButton.visible = false;
            displayList.islandScrollButton.enabled = false;
        });

        msgBus.subscribe('game.endIsland', () => {
            if (endBonus) {
                let delay = 0.2;
                islandScroll.close(() => {
                    Tween.delayedCall(delay, endBonus);
                }); //do stuff before close
            }
            displayList.islandScrollButton.visible = false;
        });
        msgBus.subscribe('game.islandComplete', () => {
            if (endBonus) {
                let delay = 1.5;
                islandBG.finalWin(nextLvl);

                islandScroll.close(() => {
                    Tween.delayedCall(delay, endBonus);
                }); //do stuff before close
            }
            displayList.islandScrollButton.visible = false;
        });
        msgBus.subscribe('game.nextIsland', () => {
            islandScroll.close(nextIsland); //do stuff before close
            nextLvl++;
            displayList.islandScrollButton.visible = false;
        });

        reset();
    }

    function reset() {
        endBonus = null;
        islandBG.reset();
        islandScroll.reset();
        islandMeter.reset();
        nextLvl = 1;
    }

    function autoPick() {
        let data = bonusData.islandData;

        let unrevealed = data.squares.filter(sq => {
            return !sq.pending;
        });
        let unrevealedArr = Object.keys(unrevealed);
        let randomSquare = unrevealed[Math.floor(Math.random() * unrevealedArr.length)];
        randomSquare.select();
        randomSquare.pending = true;
        data.selectedSquares.push(randomSquare);

        if (data.selectedSquares.length === 2) {
            data.squares.forEach(sq => {
                sq.stopIdle();
            });
            Tween.delayedCall(0.5, () => {
                data.selectedSquares.forEach(sq => {
                    sq.uncover();
                });
                msgBus.publish('game.StartPointSequence', data);
            });
        } else {
            Tween.delayedCall(0.5, autoPick);
        }
    }

    async function startBonus() {
        await new Promise(async (resolve) => {
            endBonus = resolve;
            islandMeter.start(nextLvl);
            startIsland();
        });
    }

    async function startIsland() {
        msgBus.publish('UI.updateButtons', {
            help: { enabled: true },
        });
        audio.play('next_island', false);
        await islandBG.proceedTo(nextLvl);
        await islandScroll.addMap(nextLvl - 1);
        islandMeter.idle(nextLvl);
        await islandScroll.tutorial();
        displayList.islandScrollButton.visible = SKBeInstant.config.autoRevealEnabled;
        displayList.islandScrollButton.enabled = SKBeInstant.config.autoRevealEnabled;
    }

    async function nextIsland() {
        msgBus.publish('UI.updateButtons', {
            help: { enabled: true },
        });
        await islandBG.proceedTo(nextLvl);
        await islandScroll.addMap(nextLvl - 1);
        islandMeter.idle(nextLvl);
        await islandScroll.open();
        displayList.islandScrollButton.visible = SKBeInstant.config.autoRevealEnabled;
        displayList.islandScrollButton.enabled = SKBeInstant.config.autoRevealEnabled;
    }

    return {
        init,
        reset,
        startBonus,
    };
});