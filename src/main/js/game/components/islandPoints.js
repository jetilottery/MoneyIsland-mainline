define(require => {
    const PIXI = require('com/pixijs/pixi');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    // const text = require('skbJet/componentManchester/standardIW/layout/text');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
    const bonusData = require('game/data/bonusData');
    const islandMeter = require('game/components/islandMeter');

    let totalPointsTitle, totalPointsTitle1, totalPointsTitle1B, totalPointsTitle2, totalPointsTitle2B, totalPoints, sq1Points, sq2Points, sq1Text, sq2Text, sq1Container, sq2Container, sqText = [],
        sqContainers = [];

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    function init() {
        let pointsRemaining = resLib.i18n.game.Game.pointsRemaining.split('\n');
        totalPointsTitle1 = new fittedText(pointsRemaining[0], textStyles.totalPointsTitleLower);
        totalPointsTitle1B = new fittedText(pointsRemaining[0], textStyles.totalPointsTitleUpper);
        totalPointsTitle2 = new fittedText(pointsRemaining[1], textStyles.totalPointsTitleLower);
        totalPointsTitle2B = new fittedText(pointsRemaining[1], textStyles.totalPointsTitleUpper);
        totalPoints = new fittedText('0', textStyles.totalPoints);

        sq1Points = new fittedText('0', textStyles.sqPointsVal);
        sq2Points = new fittedText('0', textStyles.sqPointsVal);

        sq1Text = new fittedText(resLib.i18n.game.Game.islandSquarePoints, textStyles.sqPoints);
        sq2Text = new fittedText(resLib.i18n.game.Game.islandSquarePoints, textStyles.sqPoints);

        totalPointsTitle = new PIXI.Container();
        sq1Container = new PIXI.Container();
        sq2Container = new PIXI.Container();

        sqText.push(sq1Points, sq2Points);
        sqContainers.push(sq1Container, sq2Container);

        sq1Points.anchor.set(0.5);
        sq2Points.anchor.set(0.5);
        sq1Text.maxWidth = 100;
        sq2Text.maxWidth = 100;
        sq1Text.anchor.set(0.5);
        sq2Text.anchor.set(0.5);
        totalPointsTitle1.anchor.set(0.5, 0.25);
        totalPointsTitle1B.anchor.set(0.5, 0.25);
        totalPointsTitle2.anchor.set(0.5, 0.25);
        totalPointsTitle2B.anchor.set(0.5, 0.25);
        totalPointsTitle1.maxWidth = 240;
        totalPointsTitle1B.maxWidth = 240;
        totalPointsTitle2.maxWidth = 240;
        totalPointsTitle2B.maxWidth = 240;
        totalPoints.anchor.set(0.5);

        totalPointsTitle.addChild(totalPointsTitle1, totalPointsTitle1B, totalPointsTitle2, totalPointsTitle2B);
        sq1Container.addChild(sq1Points, sq1Text);
        sq2Container.addChild(sq2Points, sq2Text);

        sq1Points.y = -sq1Points.height / 2.25;
        sq2Points.y = -sq2Points.height / 2.25;

        sq1Text.y = sq1Text.height / 2.25;
        sq2Text.y = sq2Text.height / 2.25;

        totalPointsTitle1.y = -totalPointsTitle1.height / 2.25;
        totalPointsTitle1B.y = totalPointsTitle1.y;
        totalPointsTitle2.y = totalPointsTitle2.height / 2.25;
        totalPointsTitle2B.y = totalPointsTitle2.y;

        displayList.sq1Container = sq1Container;
        displayList.sq2Container = sq2Container;
        displayList.islandGrid.addChild(sq1Container, sq2Container);
        displayList.islandScroll.addChild(totalPointsTitle, totalPoints);
        displayList.totalPoints = totalPoints;
        displayList.totalPointsTitle = totalPointsTitle;

        msgBus.subscribe('GameSize.OrientationChange', orientationChanged);
        orientationChanged();
    }

    function reset() {
        if (bonusData.islandData.levels[0].target && bonusData.islandData.currentLevel !== null) {
            totalPoints.text = bonusData.islandData.levels[bonusData.islandData.currentLevel].target;
        } else {
            totalPoints.text = '';
        }
        sq1Points.text = '';
        sq2Points.text = '';
        sq1Container.visible = false;
        sq2Container.visible = false;
    }

    function updateTarget() {
        totalPoints.text = bonusData.islandData.levels[bonusData.islandData.currentLevel].target;
    }

    function tweenSqValue(duration, sq, from, to, delay) {
        sqContainers[sq - 1].visible = true;
        Tween.to({ val: parseInt(from) }, duration, {
            delay: delay,
            val: parseInt(to),
            ease: 'Power0.easeNone',
            onUpdate: function() {
                sqText[sq - 1].text = Math.floor(this.target.val) > 0 ? Math.floor(this.target.val) : '';
            }
        });
    }

    function tweenTotalValue(duration, from, to, delay, continueTween) {
        totalPoints.text = from;
        let total = bonusData.islandData.levels[bonusData.islandData.currentLevel].target;
        Tween.to({ val: parseInt(totalPoints.text) }, duration, {
            delay: delay,
            val: parseInt(to),
            ease: 'Power0.easeNone',
            onStart: function() {
                islandMeter.tweenWater(bonusData.islandData.currentLevel, total - to, total, continueTween);
            },
            onUpdate: function() {
                if (totalPoints.text > 0) {
                    totalPoints.text = Math.floor(this.target.val);
                }
            }
        });
    }

    function tweenSqValueAntic(duration, sq, from, to, delay) {
        sqContainers[sq - 1].visible = true;
        Tween.to({ val: parseInt(from) }, duration, {
            delay: delay,
            val: parseInt(to),
            ease: 'Power1.easeOut',
            onUpdate: function() {
                sqText[sq - 1].text = Math.round(this.target.val);
            }
        });
    }

    function tweenTotalValueAntic(duration, from, to, delay, continueTween, callback) {
        totalPoints.text = from;
        let winTriggered = false;
        let total = bonusData.islandData.levels[bonusData.islandData.currentLevel].target;
        Tween.to({ val: parseInt(totalPoints.text) }, duration, {
            delay: delay,
            val: parseInt(to),
            ease: 'Power1.easeOut',
            onStart: function() {
                islandMeter.tweenWater(bonusData.islandData.currentLevel, total - to, total, continueTween);
            },
            onUpdate: function() {
                if (totalPoints.text > 0) {
                    totalPoints.text = Math.round(this.target.val);
                } else {
                    if (!winTriggered) {
                        winTriggered = true;
                        callback();
                    }
                    // We hit 0, lets callback and trigger the scroll win anim
                }
            }
        });
    }

    function orientationChanged() {
        let pos = {
            landscape: {
                title: {
                    x: 195,
                    y: 350
                },
                total: {
                    x: 195,
                    y: 450
                }
            },
            portrait: {
                title: {
                    x: 405,
                    y: 305
                },
                total: {
                    x: 405,
                    y: 405
                }
            },
        };
        totalPointsTitle.x = pos[orientation.get()].title.x;
        totalPointsTitle.y = pos[orientation.get()].title.y;
        totalPoints.x = pos[orientation.get()].total.x;
        totalPoints.y = pos[orientation.get()].total.y;
    }

    return {
        init,
        reset,
        updateTarget,
        tweenSqValue,
        tweenTotalValue,
        tweenSqValueAntic,
        tweenTotalValueAntic,
    };
});