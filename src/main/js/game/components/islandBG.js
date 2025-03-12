define(require => {
    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const utils = require('game/components/utils/utils');
    const bonusData = require('game/data/bonusData');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let spineBG = {};

    function init() {
        spineBG.landscape = new PIXI.spine.Spine(resLib.spine['BonusIslands_BOAT'].spineData);
        spineBG.portrait = new PIXI.spine.Spine(resLib.spine['PORT_BonusIslands_BOAT'].spineData);
        displayList.islandBonusBG.addChild(spineBG.landscape, spineBG.portrait);
        displayList.islandBonusBG.visible = false;

        reset();

        orientationChanged();
        msgBus.subscribe('GameSize.OrientationChange', orientationChanged);
    }

    function reset() {
        spineBG.landscape.skeleton.setToSetupPose(0);
        spineBG.landscape.state.clearTrack(0);
        spineBG.portrait.skeleton.setToSetupPose(0);
        spineBG.portrait.state.clearTrack(0);
    }

    function finalWin() {
        spineBG.landscape.state.setAnimation(0, `ISLAND_5-WIN`, false);
        spineBG.portrait.state.setAnimation(0, `ISLAND_5-WIN`, false);
        
        Tween.delayedCall(0.8, () => {
            audio.play('Chest_Appear', false);
        });

        utils.removeSpineListeners(spineBG.landscape);
        spineBG.landscape.state.addListener({
            complete: function (entry) {
                if (entry.animation.name === `ISLAND_5-WIN`) {
                    spineBG.landscape.state.setAnimation(0, `ISLAND_5-WIN_LOOP`, true);
                    spineBG.portrait.state.setAnimation(0, `ISLAND_5-WIN_LOOP`, true);
                }
            }
        });
    }

    async function proceedTo(lvl) {
        let currentLvl = lvl - 1;
        let nextLvl = lvl;

        bonusData.islandData.currentLevel = currentLvl;

        if (currentLvl) { // This is the win animation (only plays when you've won the level (currentLvl > 0))
            await new Promise(resolve => {
                spineBG.landscape.state.setAnimation(0, `ISLAND_${currentLvl}-WIN`, false);
                spineBG.portrait.state.setAnimation(0, `ISLAND_${currentLvl}-WIN`, false);
                Tween.delayedCall(0.8, () => {
                    audio.play('Chest_Appear', false);
                });

                utils.removeSpineListeners(spineBG.landscape);
                Tween.delayedCall(2, () => {
                    Tween.delayedCall(1.5, () => {
                        audio.play('next_island', false);
                    });
                    resolve();
                });
            });
        }

        // This is the island transition animation
        await new Promise(resolve => {
            let delay = currentLvl ? 1.75 : 0;
            Tween.delayedCall(delay, () => {
                spineBG.landscape.state.setAnimation(0, `ISLAND_${currentLvl}-${nextLvl}`, false);
                spineBG.portrait.state.setAnimation(0, `ISLAND_${currentLvl}-${nextLvl}`, false);

                utils.removeSpineListeners(spineBG.landscape);
                spineBG.landscape.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === `ISLAND_${currentLvl}-${nextLvl}`) {
                            resolve();
                            currentLvl++;
                            nextLvl++;
                        }
                    }
                });
            });
        });
    }

    // function snapTo(lvl) {

    // }

    function orientationChanged() {
        let O = orientation.get();
        spineBG.portrait.scale.set(0);
        spineBG.landscape.scale.set(0);
        spineBG[O].scale.set(1);
    }

    return {
        init,
        reset,
        proceedTo,
        finalWin
    };
});