define(require => {
    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const utils = require('game/components/utils/utils');
    const textToSpine = require('game/components/utils/textToSpine');
    const islandGrid = require('game/components/islandGrid');
    const islandMeter = require('game/components/islandMeter');
    const islandPoints = require('game/components/islandPoints');
    const bonusData = require('game/data/bonusData');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let scroll = {};
    let maps = [];

    function init() {
        scroll.landscape = new PIXI.spine.Spine(resLib.spine['BonusIsland_MAP'].spineData);
        scroll.landscape.x = 720;
        scroll.landscape.y = 405;
        scroll.portrait = new PIXI.spine.Spine(resLib.spine['PORT_BonusIsland_MAP'].spineData);
        scroll.portrait.x = 405;
        scroll.portrait.y = 720;
        displayList.islandScroll.addChild(scroll.landscape, scroll.portrait);

        displayList.islandTutorial.alpha = 0;
        displayList.islandTutorial.visible = false;

        islandGrid.init();
        islandPoints.init();
        islandGrid.reInit();

        displayList.islandGrid.visible = false;

        orientationChanged();
        msgBus.subscribe('GameSize.OrientationChange', orientationChanged);
        msgBus.subscribe('game.StartPointSequence', data => startPointSequence(data));

        maps.push(new PIXI.Sprite(PIXI.Texture.fromFrame('map1')));
        maps.push(new PIXI.Sprite(PIXI.Texture.fromFrame('map2')));
        maps.push(new PIXI.Sprite(PIXI.Texture.fromFrame('map3')));
        maps.push(new PIXI.Sprite(PIXI.Texture.fromFrame('map4')));
        maps.push(new PIXI.Sprite(PIXI.Texture.fromFrame('map5')));
    }

    function reset() {
        scroll.portrait.state.clearTrack(0);
        scroll.portrait.skeleton.setToSetupPose(0);
        scroll.landscape.state.clearTrack(0);
        scroll.landscape.skeleton.setToSetupPose(0);
        islandPoints.reset();
        displayList.islandTutorial.alpha = 0;
        displayList.islandTutorial.visible = false;
    }

    function addMap(lvl) {
        textToSpine.setText(scroll.landscape, '_JensASSETS/MAP1', maps[lvl]);//spineAnim, slotName, source
        textToSpine.setText(scroll.portrait, '_JensASSETS/MAP1', maps[lvl]);//spineAnim, slotName, source
    }

    async function tutorial() {
        await new Promise(resolve => {
            audio.play('scroll_open', false);
            scroll.landscape.state.setAnimation(0, 'MAP_UP_BLANK', false);
            scroll.portrait.state.setAnimation(0, 'MAP_UP_BLANK', false);

            utils.removeSpineListeners(scroll.landscape);
            scroll.landscape.state.addListener({
                complete: function (entry) {
                    if (entry.animation.name === 'MAP_UP_BLANK') {
                        // Show tutorial content
                        displayList.islandTutorial.alpha = 0;
                        displayList.islandTutorial.visible = true;
                        new Tween.to(displayList.islandTutorial, 0.5, {
                            alpha: 1, onComplete: async () => {
                                // Show all elements
                                // Show button and addListener to close tutorial
                                displayList.startIslandButton.alpha = 0;
                                displayList.startIslandButton.visible = true;
                                new Tween.to(displayList.startIslandButton, 0.2, { alpha: 1 });

                                displayList.startIslandButton.on('press', () => closeTutorial(resolve));
                            }
                        });
                    }
                }
            });
        });
    }

    function closeTutorial(resolve) {
        displayList.startIslandButton.visible = false;
        new Tween.to(displayList.islandTutorial, 0.5, {
            alpha: 0, onComplete: () => {

                resolve();
                utils.removeSpineListeners(scroll.landscape);

                scroll.landscape.state.setAnimation(0, 'MAP_METER_FADE', false);
                scroll.portrait.state.setAnimation(0, 'MAP_METER_FADE', false);
                islandGrid.showGrid(1);

                // displayList.islandGrid.visible = true;
                // displayList.islandGrid.alpha = 0;
                new Tween.to(displayList.islandGrid, 0.5, {
                    onComplete: () => {
                        scroll.landscape.state.setAnimation(0, 'MAP_IDLE', false);
                        scroll.portrait.state.setAnimation(0, 'MAP_IDLE', false);
                        islandGrid.enable();
                    }
                });
            }
        });

    }

    async function open() {
        await new Promise(resolve => {
            audio.play('scroll_open', false);
            scroll.landscape.state.setAnimation(0, 'MAP_UP', false); //MAP_DOWN MAP_WON
            scroll.portrait.state.setAnimation(0, 'MAP_UP', false); //MAP_DOWN MAP_WON
            Tween.delayedCall(0.5, () => {
                islandGrid.showGrid();
            });

            utils.removeSpineListeners(scroll.landscape);
            scroll.landscape.state.addListener({
                complete: function (entry) {
                    if (entry.animation.name === 'MAP_UP') {
                        resolve();
                        utils.removeSpineListeners(scroll.landscape);
                        displayList.islandGrid.visible = true;
                        islandGrid.enable();
                    }
                }
            });
        });
    }

    function close(callback) {
        audio.play('scroll_close', false);
        scroll.landscape.state.setAnimation(0, 'MAP_DOWN', false); //MAP_DOWN MAP_WON
        scroll.portrait.state.setAnimation(0, 'MAP_DOWN', false); //MAP_DOWN MAP_WON
        islandGrid.hideGrid();

        utils.removeSpineListeners(scroll.landscape);
        scroll.landscape.state.addListener({
            complete: function (entry) {
                if (entry.animation.name === 'MAP_DOWN') {
                    displayList.islandGrid.visible = false;
                    islandGrid.reset();
                    utils.removeSpineListeners(scroll.landscape);
                }
            }
        });

        // We were waiting on the plaque animation but I think that was causing the bonus not to resolve, just added a tween delay instead
        Tween.delayedCall(1.5, () => {
            callback();
        });
    }

    function startPointSequence(data) {
        positionSqText(data.selectedSquares);
        data = data.levels[bonusData.islandData.currentLevel];
        let totalValue = data.target;
        let halfSq1 = Math.floor(data.sq1Total / 2);
        let halfSq2 = Math.floor(data.sq2Total / 2);

        let tweenTime = 2;
        let tweenTimeAntic = 3.5;
        let roundGap = 0.25;
        let scrollCompletePause = 1.5;
        audio.play('points_up', true);
        // TITLE Order (duration, from, to, delay, continueTween) 
        // SQ Order (duration, sq, from, to, delay) 
        // Title Round 1
        islandPoints.tweenTotalValue(tweenTime, totalValue, totalValue - halfSq1);
        islandPoints.tweenTotalValue(tweenTime, totalValue - halfSq1, totalValue - halfSq1 - halfSq2, tweenTime, true);
        // Squares Round 1
        islandPoints.tweenSqValue(tweenTime, 1, 0, halfSq1);
        islandPoints.tweenSqValue(tweenTime, 2, 0, halfSq2, tweenTime);

        let pointsEnded = false;

        // Title Round 2
        islandPoints.tweenTotalValue(tweenTime, totalValue - halfSq1 - halfSq2, totalValue - data.sq1Total - halfSq2, (tweenTime * 2) + roundGap, true);
        islandPoints.tweenTotalValueAntic(tweenTimeAntic, totalValue - data.sq1Total - halfSq2, totalValue - data.sq1Total - data.sq2Total, (tweenTime * 3) + roundGap, true, () => {
            pointsEnded = true;
            audio.play('points_end', false);
            audio.play('island_win', false);
            scroll.landscape.state.setAnimation(0, 'MAP_WON', true);
            scroll.portrait.state.setAnimation(0, 'MAP_WON', true);

        });
        // Squares Round 2
        islandPoints.tweenSqValue(tweenTime, 1, halfSq1, data.sq1Total, (tweenTime * 2) + roundGap);
        islandPoints.tweenSqValueAntic(tweenTimeAntic, 2, halfSq2, data.sq2Total, (tweenTime * 3) + roundGap);

        let lvl;
        // If we won, play the scroll win spine
        Tween.to({}, ((tweenTime * 3) + (tweenTimeAntic) + roundGap), {
            onComplete: () => {
                if (!pointsEnded) {
                    audio.play('points_end', false);
                    pointsEnded = true;
                }

                if (parseInt(data.sq1Total) + parseInt(data.sq2Total) < data.target) {
                    audio.play('island_lose', false);
                    islandMeter.win(bonusData.islandData.currentLevel, false);
                } else {

                    lvl = bonusData.islandData.currentLevel + 1;
                    Tween.delayedCall(4, () => {
                        islandMeter.win(lvl, true);
                    });
                }
            }
        });

        // tell islandBonus that we're done with the points and we should quit or go to next level
        Tween.to({}, ((tweenTime * 3) + (tweenTimeAntic) + roundGap + scrollCompletePause), {
            onComplete: () => {
                if (parseInt(data.sq1Total) + parseInt(data.sq2Total) < data.target) {
                    msgBus.publish('game.endIsland');
                } else if (bonusData.islandData.currentLevel === 4) {
                    msgBus.publish('game.islandComplete');
                } else {
                    msgBus.publish('game.nextIsland');
                }
            }
        });
    }

    function positionSqText(squares) {
        let w = 152, h = 152;
        let s1Index = squares[0].parent.name.slice(2, 3); // get index of sq1 on grid
        let s2Index = squares[1].parent.name.slice(2, 3); // get index of sq2 on grid

        let s1Column = s1Index % 3 === 0 ? 2 : (s1Index % 3) - 1;
        let s1Row = Math.floor((s1Index - 1) / 3);
        let s2Column = s2Index % 3 === 0 ? 2 : (s2Index % 3) - 1;
        let s2Row = Math.floor((s2Index - 1) / 3);

        displayList.sq1Container.x = s1Column * w;
        displayList.sq1Container.y = s1Row * h;
        displayList.sq2Container.x = s2Column * w;
        displayList.sq2Container.y = s2Row * h;
        //    1 2 3
        //    4 5 6
        //    7 8 9
    }

    function orientationChanged() {
        // let O = orientation.get();
        // scroll.portrait.visible = false;
        // scroll.landscape.visible = false;
        // scroll[O].visible = true;
        let O = orientation.get();
        scroll.portrait.scale.set(0);
        scroll.landscape.scale.set(0);
        scroll[O].scale.set(1);
    }

    return {
        init,
        reset,
        addMap,
        tutorial,
        open,
        close
    };
});