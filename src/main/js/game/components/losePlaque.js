define(require => {
    const PIXI = require('com/pixijs/pixi');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const winUpTo = require('game/components/winUpTo');

    let losePlaqueAnim;
    let plaqueActive;

    function init() {

        losePlaqueAnim = new PIXI.spine.Spine(resLib.spine['WinPlaque'].spineData);

        displayList.losePlaqueBG.addChild(losePlaqueAnim);
        displayList.losePlaqueBG.visible = false;
        displayList.losePlaqueBG.scale.set(0.8);

        displayList.losePlaqueCloseButton.on('press', hide);

        msgBus.subscribe('GameSize.OrientationChange', orientationChanged);
    }

    function show() {
        winUpTo.reset();
        if (meterData.totalWin === 0) {
            if (gameConfig.showResultScreen & !gameConfig.suppressNonloseResultPlaque) {
                displayList.losePlaqueBG.visible = true;
                playAnim(losePlaqueAnim, 'Intro', true);
            }
        }
    }

    function playAnim(anim, name, plaqueVis) {
        let subStr;
        if (orientation.get() === 'landscape') {
            subStr = 'Land';
        } else {
            subStr = 'Port';
        }

        if (plaqueVis) {
            plaqueActive = true;
        } else {
            plaqueActive = false;
        }

        anim.state.setAnimation(0, `${subStr}/${subStr}_${name}`, false);

        return subStr;
    }

    function orientationChanged() {
        if (plaqueActive) {
            playAnim(losePlaqueAnim, 'plaque', true);
        }
    }

    function hide() {
        plaqueActive = false;

        playAnim(losePlaqueAnim, 'Outro', false);
        let subStr = losePlaqueAnim.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === `${subStr}/${subStr}_Outro`) {
                    displayList.losePlaqueBG.visible = false;
                }
            }
        });
    }

    msgBus.subscribe('UI.showResult', show);
    msgBus.subscribe('UI.hideResult', hide);

    return {
        init,
    };
});