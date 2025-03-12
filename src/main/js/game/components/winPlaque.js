define(function(require) {
    var PIXI = require('com/pixijs/pixi');

    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    var resLib = require('skbJet/component/resourceLoader/resourceLib');

    var displayList = require('skbJet/componentManchester/standardIW/displayList');

    var meterData = require('skbJet/componentManchester/standardIW/meterData');

    var gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    var orientation = require('skbJet/componentManchester/standardIW/orientation');

    var winUpTo = require('game/components/winUpTo');

    var utils = require('game/components/utils/utils');

    var loopActive = false;
    var winPlaqueAnimBG;
    var winPlaqueAnim;

    function init() {
        winPlaqueAnimBG = new PIXI.spine.Spine(resLib.spine['BigWin'].spineData);
        displayList.winPlaqueAnimBG = winPlaqueAnimBG;
        displayList.winPlaqueBacking.addChildAt(winPlaqueAnimBG, 0);
        displayList.winPlaqueBacking.visible = false;
        displayList.winPlaqueBG.visible = false;
        //displayList.winPlaqueValue.visible = displayList.winPlaqueMessageWithGradient.visible = displayList.winPlaqueMessage.visible = false;

        displayList.winPlaqueValue.visible = displayList.winPlaqueMessage.visible = false;


        winPlaqueAnim = new PIXI.spine.Spine(resLib.spine['WinPlaque'].spineData);
        displayList.winPlaqueBG.addChild(winPlaqueAnim);
        displayList.winPlaqueCloseButton.on('press', hide);
        msgBus.subscribe('GameSize.OrientationChange', orientationChanged);
    }

    function show() {
        winUpTo.reset();
        //displayList.winPlaqueValue.visible = displayList.winPlaqueMessageWithGradient.visible = displayList.winPlaqueMessage.visible = false;

        displayList.winPlaqueValue.visible = displayList.winPlaqueMessage.visible = false;


        if (gameConfig.showResultScreen && !gameConfig.suppressNonWinResultPlaque) {
            displayList.winPlaqueBG.visible = true;
        }

        if (meterData.totalWin > 0) {
            if (gameConfig.showResultScreen) {
                displayList.winPlaqueBacking.visible = true;
                displayList.winPlaqueBG.visible = true;
            }

            playAnim(winPlaqueAnimBG, 'Intro', false);
            var subStr = playAnim(winPlaqueAnim, 'Intro', false);

            if (winPlaqueAnim.state.listeners.length === 0) {
                winPlaqueAnim.state.addListener({
                    complete: function complete(entry) {
                        if (entry.animation.name === "".concat(subStr, "/").concat(subStr, "_Intro")) {
                            //displayList.winPlaqueValue.visible = displayList.winPlaqueMessageWithGradient.visible = displayList.winPlaqueMessage.visible = true;

                            displayList.winPlaqueValue.visible = displayList.winPlaqueMessage.visible = true;


                            msgBus.publish('winPlaque.performRollUp');
                            utils.removeSpineListeners(winPlaqueAnim);
                            playAnim(winPlaqueAnimBG, 'Loop', true);
                            playAnim(winPlaqueAnim, 'Loop', true);
                        }
                    }
                });
            }
        } else {
            playAnim(winPlaqueAnimBG, 'Intro', false);
        }
    }

    function playAnim(anim, name, loop) {
        var subStr;

        if (orientation.get() === 'landscape') {
            subStr = 'Land';
        } else {
            subStr = 'Port';
        }

        if (loop) {
            loopActive = true;
        } else {
            loopActive = false;
        }

        anim.renderable = true;
        anim.state.setAnimation(0, "".concat(subStr, "/").concat(subStr, "_").concat(name), loop);
        return subStr;
    }

    function orientationChanged() {
        if (loopActive) {
            playAnim(winPlaqueAnimBG, 'Loop', true);
        }
    }

    function hide() {
        loopActive = false;
        playAnim(winPlaqueAnim, 'Outro', false);
        var subStr = playAnim(winPlaqueAnimBG, 'Outro', false);

        if (winPlaqueAnimBG.state.listeners.length === 0) {
            winPlaqueAnimBG.state.addListener({
                complete: function complete(entry) {
                    if (entry.animation.name === "".concat(subStr, "/").concat(subStr, "_Outro")) {
                        utils.removeSpineListeners(winPlaqueAnimBG);
                        utils.stopSpineAnim(winPlaqueAnim);
                        utils.stopSpineAnim(winPlaqueAnimBG);
                        displayList.winPlaqueBacking.visible = false;
                        displayList.winPlaqueBG.visible = false;

                        //displayList.winPlaqueValue.visible = displayList.winPlaqueMessageWithGradient.visible = displayList.winPlaqueMessage.visible = false;
                        displayList.winPlaqueValue.visible = displayList.winPlaqueMessage.visible = false;

                    }
                }
            });
        }
    }

    msgBus.subscribe('UI.showResult', show);
    msgBus.subscribe('UI.hideResult', hide);
    return {
        init: init
    };
});