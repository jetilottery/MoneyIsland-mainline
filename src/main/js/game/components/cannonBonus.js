define(require => {
  const PIXI = require('com/pixijs/pixi');
  const resLib = require('skbJet/component/resourceLoader/resourceLib');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
  const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
  const Cannon = require('./Cannon');
  const bonusMeter = require('./bonusMeter');

  require('com/gsap/TweenLite');
  const Tween = window.TweenLite;

  let scenario;
  // let bonusComplete;
  // let plaqueAnim;
  let cannons;
  // let preMultWin = 0;
  let multiplier = 1;

  let boatPlacement = [
    2, 1, 3, 3, 1, 1,
    1, 2, 3, 1, 3, 2
  ];

  let boatFlips = [
    false, true, false, false, true, false,
    false, false, false, true, false, false
  ];

  let boatGroup = [{
    'landscape': 'L',
    'portrait': 'M'
  }, {
    'landscape': 'L',
    'portrait': 'M'
  }, {
    'landscape': 'M',
    'portrait': 'M'
  }, {
    'landscape': 'M',
    'portrait': 'M'
  }, {
    'landscape': 'R',
    'portrait': 'L'
  }, {
    'landscape': 'R',
    'portrait': 'M'
  }, {
    'landscape': 'L',
    'portrait': 'M'
  }, {
    'landscape': 'L',
    'portrait': 'M'
  }, {
    'landscape': 'M',
    'portrait': 'R'
  }, {
    'landscape': 'M',
    'portrait': 'M'
  }, {
    'landscape': 'R',
    'portrait': 'L'
  }, {
    'landscape': 'R',
    'portrait': 'R'
  }];

  let summaryText;
  let winValOnEntry;

  function idleManager(data) {
    switch (data.state) {
      case 'IdleAll':
        Tween.killTweensOf(promptIdle);
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
    displayList.cannonBonusBG.visible = false;
    displayList.cannonBonus.visible = false;
    displayList.cbInfoTotal.value = 0;
    displayList.cbInfoTotal.text = SKBeInstant.formatCurrency(displayList.cbInfoTotal.value).formattedAmount;

    displayList.cbInfoTotalFade.visible = false;
    displayList.cbInfoTotalFade.value = 0;
    displayList.cbInfoTotalFade.text = '';

    cannons = [
      Cannon.fromContainer(displayList.cannonBonusP1),
      Cannon.fromContainer(displayList.cannonBonusP2),
      Cannon.fromContainer(displayList.cannonBonusP3),
      Cannon.fromContainer(displayList.cannonBonusP4),
      Cannon.fromContainer(displayList.cannonBonusP5),
      Cannon.fromContainer(displayList.cannonBonusP6),
      Cannon.fromContainer(displayList.cannonBonusP7),
      Cannon.fromContainer(displayList.cannonBonusP8),
      Cannon.fromContainer(displayList.cannonBonusP9),
      Cannon.fromContainer(displayList.cannonBonusP10),
      Cannon.fromContainer(displayList.cannonBonusP11),
      Cannon.fromContainer(displayList.cannonBonusP12)
    ];

    cannons.forEach((c, i) => {
      c.boatNum = boatPlacement[i];
      c.boatFlips = boatFlips[i];
      c.direction = boatGroup[i];
      c.initSpine();
      c.reset();
    });

    let cbBGSpine = new PIXI.spine.Spine(resLib.spine['Cannon_BonusBG'].spineData);
    displayList.cannonBonusBG.addChild(cbBGSpine);
    displayList.cbBGSpine = cbBGSpine;
    cbBGSpine.state.setAnimation(0, 'Cannon_BG_IDLE', true); //Cannon_BG_SHOOT

    let cannonBall = new PIXI.Sprite(PIXI.Texture.fromFrame('canonBallL'));
    cannonBall.anchor.set(0.5);
    cannonBall.visible = false;
    displayList.cannonBall.addChild(cannonBall);

    let cannonSpine = new PIXI.spine.Spine(resLib.spine['Cannon_Bonus'].spineData);
    displayList.cannonSpine = cannonSpine;
    displayList.cannonBonusCannon.addChild(cannonSpine);
    cannonSpine.state.setAnimation(0, 'Cannon_IDLE', true); //Cannon_BG_SHOOT

    displayList.bonusRevealAll.on('press', () => {
      msgBus.publish('Game.AutoPlayStart');
      msgBus.publish('UI.updateButtons', {
        help: {
          enabled: false
        },
      });
      audio.play('click');

      displayList.bonusRevealAll.enabled = false;
      displayList.bonusRevealAll.visible = false;
    });

    displayList.bonusRevealAll.enabled = SKBeInstant.config.autoRevealEnabled;
    displayList.bonusRevealAll.visible = SKBeInstant.config.autoRevealEnabled;

    let summaryPlaqueBG = new PIXI.spine.Spine(resLib.spine['WinPlaque'].spineData);
    let cannonSumLText = new fittedText(' ', textStyles.cannonSumText);
    let cannonSumRText = new fittedText(' ', textStyles.cannonSumText);
    let cannonTotalTitleTextLower = new fittedText(resLib.i18n.game.Game.cannonSummaryTotalWin, textStyles.cannonTotalTitleTextLower);
    let cannonTotalTitleTextUpper = new fittedText(resLib.i18n.game.Game.cannonSummaryTotalWin, textStyles.cannonTotalTitleTextUpper);
    let cannonTotalText = new fittedText(SKBeInstant.formatCurrency(0).formattedAmount, textStyles.cannonTotalText);
    cannonSumLText.anchor.set(0.5);
    cannonSumRText.anchor.set(0, 0.5);
    cannonTotalTitleTextLower.anchor.set(0.5);
    cannonTotalTitleTextUpper.anchor.set(0.5);
    cannonTotalText.anchor.set(0.5);

    cannonTotalTitleTextLower.maxWidth = 580;
    cannonTotalTitleTextUpper.maxWidth = 580;

    displayList.cannonSummary.addChild(summaryPlaqueBG, cannonSumLText, cannonSumRText, cannonTotalTitleTextLower, cannonTotalTitleTextUpper, cannonTotalText);
    displayList.cannonSummary.visible = false;
    displayList.summaryPlaqueBG = summaryPlaqueBG;
    summaryText = [cannonSumLText, cannonSumRText, cannonTotalTitleTextLower, cannonTotalTitleTextUpper, cannonTotalText];
  }

  function promptIdle() {
    // Check if there are any remaining unrevealed cannons
    const unrevealed = cannons.filter(number => !number.revealed);
    if (unrevealed.length === 0) {
      return;
    }

    for (let i = 0; i < unrevealed.length; i++) {
      if (unrevealed[i].interactionState !== "IDLE") {
        unrevealed[i].prompt();
      }
    }
  }

  function stopIdle() {
    Tween.killTweensOf(promptIdle);
    // Check if there are any remaining unrevealed cannons
    const unrevealed = cannons.filter(number => !number.revealed);
    if (unrevealed.length === 0) {
      return;
    }

    for (let i = 0; i < unrevealed.length; i++) {
      unrevealed[i].stopIdle();
    }
  }

  function populate(data) {
    scenario = data.scenario;
  }

  function start() {
    winValOnEntry = meterData.win;
  }

  function reset() {
    scenario = undefined;
    winValOnEntry = 0;

    // preMultWin = 0;
    multiplier = 1;

    displayList.bonusRevealAll.enabled = SKBeInstant.config.autoRevealEnabled;
    displayList.bonusRevealAll.visible = SKBeInstant.config.autoRevealEnabled;

    displayList.cbInfoTotal.value = 0;
    displayList.cbInfoTotal.text = SKBeInstant.formatCurrency(displayList.cbInfoTotal.value).formattedAmount;

    displayList.cbInfoTotalFade.value = 0;
    displayList.cbInfoTotalFade.text = '';
    displayList.cbInfoTotalFade.visible = false;

    displayList.cbInfoMulti.text = resLib.i18n.game.Game.cannonMultiplerTitle.replace("{0}", multiplier);
    displayList.cbInfoMultiFade.text = '';
    displayList.cbInfoMultiFade.visible = false;

    fade(summaryText[0], null, 0.5, 0, 5);
    fade(summaryText[1], null, 0.5, 0, 5);
    fade(summaryText[2], null, 0.5, 0, 5);
    fade(summaryText[3], null, 0.5, 0, 5);
    fade(summaryText[4], null, 0.5, 0, 5);

    displayList.summaryPlaqueBG.state.clearTrack(0);
    displayList.summaryPlaqueBG.skeleton.setToSetupPose(0);
    displayList.cannonSummary.visible = false;
    // bonusComplete = undefined;
    cannons.forEach(cannon => {
      cannon.reset();
      cannon.alpha = 1;
    });
  }


  function enable() {
    // Return an array of promises for each cannon's lifecycle
    msgBus.publish('Bonus.IdleAll');
    return cannons.map(async cannon => {
      // Enable the cannon and wait for it to be revealed (manually or automatically)
      await cannon.enable();
      // Get the next Winning Number
      let prizeVal = scenario.cannonBonus.shift();
      if (prizeVal !== 'X' && prizeVal !== 'M' && prizeVal) {
        // Populate the cannon with the next Player Number, ready to be uncovered
        cannon.populate(prizeVal);

        await cannon.uncover(prizeVal, sumOfBoats);
      } else if (prizeVal === 'M') {
        cannon.populate(null, resLib.i18n.game.Game.cannonMultipler.replace("{0}", 1));

        await cannon.uncover(prizeVal, multiTotal);
      } else if (prizeVal === 'X') {
        displayList.bonusRevealAll.enabled = false;
        displayList.bonusRevealAll.visible = false;
        cannon.populate(null, resLib.i18n.game.Game.cannonCollect);
        msgBus.publish('Bonus.StopIdle');
        let finalReveal = cannons.indexOf(cannon);

        // Fulfill the promises for the unopened cannons as we have finished the bonus 
        cannons.forEach(c => {
          if (!c.revealed && cannons.indexOf(c) !== finalReveal) {
            c.reveal();
            c.revealed = true;
            Tween.delayedCall(2, () => {
              Tween.to(c, 0.5, {
                alpha: 0.4
              });
            });
          }
        });

        await cannon.uncover(prizeVal);
        await bonusEnd();
        // stop idles
      }
    });
  }

  async function bonusEnd() {
    await new Promise(resolve => {
      fade(null, displayList.summaryPlaqueBG, 1.25, 0.5);
      fade(null, summaryText[0], 2, 0.5);
      fade(null, summaryText[1], 2.5, 0.5);
      fade(null, summaryText[2], 3.25, 0.5);
      fade(null, summaryText[3], 3.25, 0.5);
      fade(null, summaryText[4], 3.25, 0.5);
      displayList.cannonSummary.visible = true;
      displayList.summaryPlaqueBG.state.setAnimation(0, 'Land/Land_Intro', false);

      bonusMeter.cannonReturn(summaryText[4].text);

      // We were waiting on the plaque animation but I think that was causing the bonus not to resolve, just added a second to the delay instead
      Tween.delayedCall(3.5, () => {
        resolve();
      });
    });
  }

  /**
   * We can use the 'from' (and leave 'to' as null) parameter alone to just fadeOut.
   * We can use the 'to' (and leave 'from' as null) parameter alone to just fadeIn.
   * staggerDelay is the delay between from and to, default is 0.5. 
   */
  function fade(from, to, staggerDelay, duration) {
    staggerDelay = staggerDelay ? staggerDelay : 0.5;
    duration = duration ? duration : 0.1;
    if (from) {
      from.visible = true;
      from.alpha = 1;

      Tween.to(from, duration, {
        alpha: 0,
        onComplete: () => {
          from.visible = false;
        },
        delay: staggerDelay,
      });
    }

    if (to) {
      to.visible = true;
      to.alpha = 0;
      Tween.to(to, duration, {
        alpha: 1,
        delay: staggerDelay,
      });
    }
  }


  function sumOfBoats(val) {
    // plaqueAnim.state.setAnimation(0, 'CannonPlaquePop', false);
    displayList.cbInfoTotal.visible = true;

    displayList.cbInfoTotal.value += val;
    displayList.cbInfoTotalFade.visible = true;
    displayList.cbInfoTotalFade.alpha = 1;
    displayList.cbInfoTotalFade.text = displayList.cbInfoTotal.text;

    displayList.cbInfoTotal.text = SKBeInstant.formatCurrency(displayList.cbInfoTotal.value).formattedAmount;

    updateSummaryText();

    let moveSpeed = 0.25;

    displayList.cbInfoTotal.scale.x = 0;
    displayList.cbInfoTotal.scale.y = 0;
    displayList.cbInfoTotalFade.scale.x = 1;
    displayList.cbInfoTotalFade.scale.y = 1;

    Tween.to(displayList.cbInfoTotal.scale, moveSpeed, {
      x: 1,
      y: 1
    });
    Tween.to(displayList.cbInfoTotalFade.scale, moveSpeed, {
      x: 2,
      y: 2
    });
    Tween.to(displayList.cbInfoTotalFade, moveSpeed, {
      alpha: 0
    });

  }

  function updateSummaryText() {
    let totalWin = parseInt(displayList.cbInfoTotal.value) * multiplier;
    summaryText[0].text = `${multiplier} X `;
    summaryText[1].text = displayList.cbInfoTotal.text;
    summaryText[4].text = SKBeInstant.formatCurrency(totalWin).formattedAmount;

    // positioning
    summaryText[0].y = summaryText[1].y = -100;
    summaryText[2].y = -13;
    summaryText[3].y = -13;
    summaryText[4].y = 70;

    summaryText[0].x = -(summaryText[1].width / 2);
    summaryText[1].x = (summaryText[0].width / 2) - (summaryText[1].width / 2);

    meterData.win = winValOnEntry + totalWin;
  }

  function multiTotal() {
    multiplier++;
    // plaqueAnim.state.setAnimation(0, 'CannonPlaquePop', false);
    displayList.cbInfoMulti.visible = true;

    displayList.cbInfoMultiFade.visible = true;
    displayList.cbInfoMultiFade.alpha = 1;
    displayList.cbInfoMultiFade.text = displayList.cbInfoMulti.text;

    displayList.cbInfoMulti.text = resLib.i18n.game.Game.cannonMultiplerTitle.replace("{0}", multiplier);

    updateSummaryText();

    let moveSpeed = 0.25;

    displayList.cbInfoMulti.scale.x = 0;
    displayList.cbInfoMulti.scale.y = 0;
    displayList.cbInfoMultiFade.scale.x = 1;
    displayList.cbInfoMultiFade.scale.y = 1;

    Tween.to(displayList.cbInfoMulti.scale, moveSpeed, {
      x: 1,
      y: 1
    });
    Tween.to(displayList.cbInfoMultiFade.scale, moveSpeed, {
      x: 2,
      y: 2
    });
    Tween.to(displayList.cbInfoMultiFade, moveSpeed, {
      alpha: 0
    });

  }

  function revealAll() {
    // Get all the cards yet to be revealed
    const unrevealed = cannons.filter(cannon => !cannon.revealed);
    shuffleArray(unrevealed);
    // Return an array of tweens that calls reveal on each card in turn
    return unrevealed.map(cannon => Tween.delayedCall(0, cannon.reveal, null, cannon));
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

  msgBus.subscribe('Bonus.IdleAll', () => idleManager({
    state: 'IdleAll'
  }));
  msgBus.subscribe('Bonus.StopIdle', () => idleManager({
    state: 'StopIdle'
  }));


  return {
    init,
    populate,
    start,
    enable,
    reset,
    revealAll,
  };
});