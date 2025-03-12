define(require => {
  const PIXI = require('com/pixijs/pixi');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const resLib = require('skbJet/component/resourceLoader/resourceLib');
  const audio = require('skbJet/componentManchester/standardIW/audio');

  let cannonPips = [];
  let boatPips = [];

  let cannonPipIndex = 0;
  let boatPipIndex = 0;

  let cannonBonusMeter, boatBonusMeter;

  function init() {
    cannonBonusMeter = new PIXI.spine.Spine(resLib.spine['BonusMeters'].spineData);
    boatBonusMeter = new PIXI.spine.Spine(resLib.spine['BonusMeters'].spineData);

    displayList.CB_Meter.addChild(cannonBonusMeter);
    displayList.BB_Meter.addChild(boatBonusMeter);

    let bPip_1 = new PIXI.spine.Spine(resLib.spine['BonusMeters'].spineData);
    displayList.bPip_1.addChild(bPip_1);
    let bPip_2 = new PIXI.spine.Spine(resLib.spine['BonusMeters'].spineData);
    displayList.bPip_2.addChild(bPip_2);
    let bPip_3 = new PIXI.spine.Spine(resLib.spine['BonusMeters'].spineData);
    displayList.bPip_3.addChild(bPip_3);

    boatPips.push(bPip_1, bPip_2, bPip_3);

    let cPip_1 = new PIXI.spine.Spine(resLib.spine['BonusMeters'].spineData);
    displayList.cPip_1.addChild(cPip_1);
    let cPip_2 = new PIXI.spine.Spine(resLib.spine['BonusMeters'].spineData);
    displayList.cPip_2.addChild(cPip_2);
    let cPip_3 = new PIXI.spine.Spine(resLib.spine['BonusMeters'].spineData);
    displayList.cPip_3.addChild(cPip_3);
    cannonPips.push(cPip_1, cPip_2, cPip_3);

    pauseAtFirstFrame();
  }

  function pauseAtFirstFrame() {
    // cannonBonusMeter.state.clearTrack(0);
    // boatBonusMeter.skeleton.setToSetupPose();
    // cannonBonusMeter.state.clearTrack(0);
    // boatBonusMeter.skeleton.setToSetupPose();
    boatBonusMeter.state.setAnimation(0, 'BOAT_Idle', false);
    boatBonusMeter.state.timeScale = 0;
    cannonBonusMeter.state.setAnimation(0, 'CANNON_Idle', false);
    cannonBonusMeter.state.timeScale = 0;
  }

  function idle() {
    boatBonusMeter.state.setAnimation(0, 'BOAT_Idle', true);
    boatBonusMeter.state.timeScale = 1;
    cannonBonusMeter.state.setAnimation(0, 'CANNON_Idle', true);
    cannonBonusMeter.state.timeScale = 1;
  }

  function addPipToBoat() {
    boatPips[boatPipIndex].state.setAnimation(0, 'PIP_Trigger', false);
    boatBonusMeter.state.setAnimation(0, 'BOAT_Trigger', false);

    boatBonusMeter.state.addListener({
      complete: function(entry) {
        if (entry.animation.name === 'BOAT_Trigger') {
          boatBonusMeter.state.setAnimation(0, 'BOAT_Idle', true);
          boatBonusMeter.state.listeners.forEach((sp) => {
            boatBonusMeter.state.removeListener(sp);
          });
        }
      }
    });
    boatPipIndex++;
    audio.play('bonus_icon_' + boatPipIndex, false);
  }

  function addPipToCannon() {
    cannonPips[cannonPipIndex].state.setAnimation(0, 'PIP_Trigger', false);
    cannonBonusMeter.state.setAnimation(0, 'CANNON_Trigger', false);

    cannonBonusMeter.state.addListener({
      complete: function(entry) {
        if (entry.animation.name === 'CANNON_Trigger') {
          cannonBonusMeter.state.setAnimation(0, 'CANNON_Idle', true);
          cannonBonusMeter.state.listeners.forEach((sp) => {
            cannonBonusMeter.state.removeListener(sp);
          });
        }
      }
    });
    cannonPipIndex++;
    audio.play('bonus_icon_' + cannonPipIndex, false);
  }

  function cannonsFilled() {
    audio.play('bonus_triggered', false);
    cannonBonusMeter.state.setAnimation(0, 'CANNON_Filled', true);
  }

  function boatsFilled() {
    audio.play('bonus_triggered', false);
    boatBonusMeter.state.setAnimation(0, 'BOAT_Filled', true);
  }

  function boatReturn(value) {
    boatBonusMeter.state.setAnimation(0, 'BOAT_Idle_BLANK', false);
    displayList.boatBonusText.visible = true;
    displayList.boatBonusText.text = value;
    boatPips.forEach(pip => {
      pip.state.clearTrack(0);
      pip.skeleton.setToSetupPose();
    });
  }

  function cannonReturn(value) {
    cannonBonusMeter.state.setAnimation(0, 'CANNON_Idle_BLANK', false);
    displayList.cannonBonusText.visible = true;
    displayList.cannonBonusText.text = value;
    cannonPips.forEach(pip => {
      pip.state.clearTrack(0);
      pip.skeleton.setToSetupPose();
    });
  }

  function reset() {
    cannonPips.forEach(pip => {
      pip.state.clearTrack(0);
      pip.skeleton.setToSetupPose();
    });
    boatPips.forEach(pip => {
      pip.state.clearTrack(0);
      pip.skeleton.setToSetupPose();
    });

    pauseAtFirstFrame();

    displayList.boatBonusText.visible = false;
    displayList.cannonBonusText.visible = false;

    displayList.boatBonusText.text = " ";
    displayList.cannonBonusText.text = " ";

    cannonPipIndex = 0;
    boatPipIndex = 0;
  }

  return {
    init,
    reset,
    idle,
    addPipToCannon,
    addPipToBoat,
    cannonsFilled,
    boatsFilled,
    boatReturn,
    cannonReturn,
    pause: pauseAtFirstFrame,
    cannonsCollected: () => {
      return cannonPipIndex;
    },
    boatsCollected: () => {
      return boatPipIndex;
    },
  };
});