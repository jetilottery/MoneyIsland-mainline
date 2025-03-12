define(require => {
    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const bonusMeter = require('./bonusMeter');
    // const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    // const orientation = require('skbJet/componentManchester/standardIW/orientation');
    // const utils = require('game/components/utils/utils');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    const zeroPoint = -910;
    const lvlScale = 100;
    const iconWidth = 80;

    let meter, meterIcons;

    let val1, val2, val3,
        val4, val5;

    let values, valuesContainer;
    let winValOnEntry;

    function init() {
        meter = new PIXI.spine.Spine(resLib.spine['BonusIsland_METER'].spineData);
        meterIcons = new PIXI.spine.Spine(resLib.spine['BonusIsland_METER_ICONS'].spineData);

        meter.state.setAnimation(0, "Meter_LOOP", true);

        val1 = new fittedText(SKBeInstant.formatCurrency(0).formattedAmount, textStyles.valueDefault); // valueWon valueNull
        val2 = new fittedText(SKBeInstant.formatCurrency(0).formattedAmount, textStyles.valueDefault);
        val3 = new fittedText(SKBeInstant.formatCurrency(0).formattedAmount, textStyles.valueDefault);
        val4 = new fittedText(SKBeInstant.formatCurrency(0).formattedAmount, textStyles.valueDefault);
        val5 = new fittedText(SKBeInstant.formatCurrency(0).formattedAmount, textStyles.valueDefault);

        values = [val1, val2, val3, val4, val5];
        values.forEach((val, i) => {
            val.anchor.set(0.5);
            val.x = 730 * (i * 0.25);
        });

        valuesContainer = new PIXI.Container();
        valuesContainer.addChild(val1, val2, val3, val4, val5);

        valuesContainer.x = -282;
        valuesContainer.y = 35;

        displayList.islandBonusMeter.addChild(meter, meterIcons, valuesContainer);


        reset();
        //Icon_IDLE_1
        //Icon_WON_1
    }

    function populate(data) {
        const highestWin = valuesContainer.children[4]; 

        values.forEach((val, i) => {
            let prize = data.islandBonusPrizes[i];
            if (prize) {
                val.text = SKBeInstant.formatCurrency(prize).formattedAmount;
                val.val = prize;
            }
        });

        highestWin.maxWidth = 160;
        const valueScale = highestWin.scale._x;

        values.forEach((val) => {
            val.scale.set(valueScale);
        });

        highestWin.x = 730;

        while(highestWin.x + highestWin.width > 855){
            highestWin.x --;
        }

    }

    function start(lvl) {
        winValOnEntry = meterData.win;
        idle(lvl);
    }

    function reset() {
        winValOnEntry = 0;
        meter.skeleton.bones[2].x = zeroPoint; //set water to 0 
        values.forEach((val) => {
            val.style = textStyles.valueDefault;
            val.visible = true;
        });
    }

    // 20% 20 accrued 100 Target
    // 20% 40 accrued 200 Target 200/40
    async function tweenWater(lvl, pointsAccrued, pointTarget, continueTween) {
        let currentLvl = lvl;
        // let nextLvl = lvl;
        let startPoint;
        if (continueTween) {
            startPoint = meter.skeleton.bones[2].x;
        } else {
            startPoint = (lvlScale * currentLvl) + (iconWidth * currentLvl) + zeroPoint;
        }

        let percentage = (pointsAccrued / pointTarget) * lvlScale;
        let endPoint = (lvlScale * currentLvl) + (iconWidth * currentLvl) + zeroPoint + percentage;
        Tween.fromTo(meter.skeleton.bones[2], 2, { x: startPoint }, { x: endPoint });
    }

    function idle(lvl) {
        meterIcons.state.setAnimation(0, `Icon_IDLE_${lvl}`, true);
    }

    function win(lvl, resume) {
        for (let i = lvl - 1; i >= 0; i--) {
            values[i].style = textStyles.valueNull;
            values[i].visible = false;
        }
        values[lvl - 1].style = textStyles.valueWon;
        values[lvl - 1].visible = true;
        bonusMeter.boatReturn(values[lvl - 1].text);
        meterIcons.state.setAnimation(0, `Icon_WON_${lvl}`, true);

        if(resume){
            let winAmount = values[lvl - 1].val + winValOnEntry;
            meterData.win = winAmount;
        }
    }

    return {
        init,
        populate,
        start,
        reset,
        tweenWater,
        idle,
        win
    };
});