define(require => {
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const utils = require('game/components/utils/utils');
    const bonusMeter = require('game/components/bonusMeter');
    const bonusController = require('game/components/bonusController');
    const sparkCreator = require('game/components/sparkCreator');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');


    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let chestTypes = { 'X': 'LOSE', 1: 'BOAT', 2: 'CANNON' };

    // let idleQueue = [];

    class NumberCard extends Pressable {
        constructor() {
            super();

            this.chestStatic = true;

            this.WIDTH = 154;
            this.HEIGHT = 154;

            this.chestAnim = undefined;

            this.symbol = new PIXI.Container();
            this.symbol.name = 'symbol';

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';
            this.resultContainer.width = 200;
            this.resultContainer.height = 90;

            this.symbolContainer = new PIXI.Container();
            this.symbolContainer.addChild(this.symbol);

            this.addChild(this.symbolContainer);

            // State
            this.hovering = false;
            this.revealed = false;
            this.revealing = false;

            // Interactivity
            this.hitArea = new PIXI.Rectangle(
                this.WIDTH / -2,
                (this.HEIGHT / -2) + 10,
                this.WIDTH,
                this.HEIGHT - 10
            );
            this.on('press', () => {
                if (!autoPlay.enabled) {
                    this.reveal();
                }
            });
            //add the pointerover event
            this.off('pointerover');
            this.on('pointerover', () => {
                this.rollover();
            });
            this.off('pointerout');
            this.on('pointerout', () => {
                this.stopRollover();
            });
        }

        initSpine() {
            const _this = this;
            // Set up spine project
            _this.chestAnim = new PIXI.spine.Spine(resLib.spine['Chest_' + this.chestRefLand].spineData);
            _this.prizeSpine = new PIXI.spine.Spine(resLib.spine['Chest_Reveals'].spineData);

            _this.defaultState = `/Chest_STATIC_`;
            _this.currentState = 'idle';
            _this.parent.children.forEach(chestChild => {
                if (chestChild.name && chestChild.name.indexOf('playerNumberChest') > -1) {
                    chestChild.addChild(_this.chestAnim);
                }
            });
            _this.addChild(_this.prizeSpine);

            _this.setSpineState({ state: 'STATIC', loop: false });

            bonusMeter.init();
        }

        enable() {
            bonusMeter.idle();
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;
            }).then(() => {
                this.enabled = false;
            });
        }

        populate(chest) {
            this.chestPrize = chestTypes[chest.data];
        }

        prompt() {
            this.currentState = 'idle';
            // this.setSpineState({ state: 'IDLE', loop: true });
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        rollover() {
            msgBus.publish('Game.StopIdle');
            this.hovering = true;
            this.setSpineState({ state: 'ROLLOVER', loop: true });
        }

        stopRollover() {
            // idleQueue.push(this);
            msgBus.publish('Game.StopIdle');
            this.hovering = false;
            const evt = (this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            msgBus.publish(evt + 'Out', this);
            // if (this.interactionState !== 'ROLLOVER') {
            //     return;
            // } else {
            msgBus.publish('Game.IdleAll');
            // }
        }

        stopIdle() {
            this.setSpineState({ state: 'STATIC', loop: false });
        }

        setSpineState(data) {
            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            switch (data.state) {
                case 'STATIC':
                    nextState = `/Chest_STATIC_`;
                    break;
                case 'IDLE':
                    nextState = `/Chest_IDLE_`;
                    break;
                case 'INACTIVE':
                    this.chestStatic = false;
                    nextState = `/Chest_INACTIVE`;
                    break;
                case 'ROLLOVER':
                    nextState = `/Chest_MOUSEOVER_`;
                    break;
                case 'REVEAL':
                    this.chestStatic = false;
                    nextState = `/Chest_REVEAL_`;
                    break;
                case 'REVEAL_LOSE':
                    nextState = `/Chest_REVEAL_LOSE_`;
                    break;
                case 'REVEAL_LOSE_IDLE':
                    nextState = `/Chest_REVEAL_LOSE_IDLE_`;
                    break;
                case 'REVEAL_WIN_IDLE':
                    nextState = `/Chest_REVEAL_WIN_IDLE_`;
                    break;
                case 'REVEAL_CANNON_IDLE':
                    nextState = `/Chest_REVEAL_WIN_IDLE_`;
                    break;
                case 'REVEAL_BOAT_IDLE':
                    nextState = `/Chest_REVEAL_WIN_IDLE_`;
                    break;
                case 'ROLLOUT':
                    nextState = this.defaultState;
                    nextState = `/Chest_IDLE_`;
                    break;
                case 'OFF':
                    nextState = this.defaultState;
                    break;
                default:
                    nextState = this.defaultState;
                    break;
            }
            // If we're already in a rollout state, we don't want to be forcing the state back to default
            // as this would interrupt the rollout animation, so if we're going back to default, don't do anything
            // if (this.interactionState === 'ROLLOUT' && nextState === this.defaultState) {
            //     return;
            // }

            // Store the interaction state
            this.interactionState = data.state;

            utils.log('Changing spine state to: ' + nextState);
            this.chestAnim.renderable = data.state !== 'OFF';
            if (data.state !== "INACTIVE") {
                this.chestAnim.state.setAnimation(syncTime, `Chest${this.chestRefLand}${nextState}${this.chestRefLand}`, doLoop);
            } else {
                this.chestAnim.state.setAnimation(syncTime, `Chest${this.chestRefLand}${nextState}`, doLoop);
            }
        }

        setPrizeSpineState(data) {
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            let prizeAnim = null;
            switch (data.state) {
                case 'REVEAL_LOSE':
                    return;
                case 'REVEAL_WIN':
                    prizeAnim = `Chest_Reveals/Chest_REVEAL_WIN_1`;
                    break;
                case 'REVEAL_CANNON':
                    prizeAnim = `Chest_Reveals/Chest_REVEAL_CANNON_1`;
                    break;
                case 'REVEAL_BOAT':
                    prizeAnim = `Chest_Reveals/Chest_REVEAL_BOAT_1`;
                    break;
                case 'REVEAL_WIN_IDLE':
                    prizeAnim = `Chest_Reveals/Chest_REVEAL_WIN_IDLE_1`;
                    break;
                case 'REVEAL_CANNON_IDLE':
                    prizeAnim = `Chest_Reveals/Chest_REVEAL_CANNON_IDLE_1`;
                    break;
                case 'REVEAL_BOAT_IDLE':
                    prizeAnim = `Chest_Reveals/Chest_REVEAL_BOAT_IDLE_1`;
                    break;
            }
            this.prizeSpine.state.setAnimation(syncTime, prizeAnim, doLoop);
        }

        async uncover() {
            await new Promise(resolve => {
                this.interactive = false;
                this.revealing = true;
                this.hovering = false;

                var globalScope = this;
                let symbolRevealDelay;

                symbolRevealDelay = 1000;

                globalScope.resultContainer.visible = true;
                globalScope.resultContainer.alpha = 1;
                utils.removeSpineListeners(globalScope.chestAnim);
                // Disable interactivity to prevent re-reveal, then switch to the animation
                this.setSpineState({ state: 'REVEAL', loop: false });
                // this.setPrizeSpineState({ state: 'REVEAL', loop: false });
                this.currentState = 'idle';

                this.chestType = chestTypes[this.chestPrize];
                this.chestType = this.chestType ? this.chestType : 'WIN';
                let _this = this;

                // Because the pip isn't added yet but we need to disable the game in manual reveal
                if ((bonusMeter.cannonsCollected() === 2 && _this.chestType === 'CANNON') || (bonusMeter.boatsCollected() === 2 && _this.chestType === 'BOAT')) {
                    if (!autoPlay.enabled) {
                        displayList.playerNumbers.interactiveChildren = false;
                    }
                }

                // Chest1/Chest_REVEAL_ANTICIPATION_1
                if (_this.chestType !== 'LOSE') {

                    if (_this.chestType === 'WIN') {
                        _this.addText(_this.prizeSpine); //spineAnim, slotName, source


                        //scale down the prize if it's in portrait
                        if (orientation.get() === orientation.PORTRAIT) {
                            _this.prizeSpine.scale.set(0.8);
                        }


                        Tween.delayedCall(0.7, () => {
                            audio.playSequential('chestPrize', false, 0.7);
                        });
                    } else {
                        Tween.delayedCall(0.7, () => {
                            audio.play('chest_bonus');
                        });
                    }

                    this.setPrizeSpineState({ state: `REVEAL_${this.chestType}`, loop: false });
                    this.prizeSpine.state.addListener({
                        complete: async function(entry) {
                            if (entry.animation.name === `Chest_Reveals/Chest_REVEAL_${_this.chestType}_1`) {

                                _this.setSpineState({ state: `REVEAL_${_this.chestType}_IDLE`, loop: true });
                                _this.setPrizeSpineState({ state: `REVEAL_${_this.chestType}_IDLE`, loop: true });

                                _this.prizeSpine.state.listeners.forEach((sp) => {
                                    _this.prizeSpine.state.removeListener(sp);
                                });

                                if (_this.chestType !== 'WIN') {
                                    let stageX = _this.parent.x + displayList.playerNumbers.x;
                                    let stageY = _this.parent.y + displayList.playerNumbers.y;
                                    let spark;
                                    switch (_this.chestType) {
                                        case 'BOAT':
                                            spark = new sparkCreator();
                                            spark.animate({ x: stageX, y: stageY }, { x: displayList.BB_Meter.x, y: displayList.BB_Meter.y }, 0.5, bonusMeter.addPipToBoat);
                                            break;
                                        case 'CANNON':
                                            spark = new sparkCreator();
                                            spark.animate({ x: stageX, y: stageY }, { x: displayList.CB_Meter.x, y: displayList.CB_Meter.y }, 0.5, bonusMeter.addPipToCannon);
                                            break;
                                    }

                                    setTimeout(async () => {
                                        if (_this.chestType === 'CANNON' && bonusMeter.cannonsCollected() === 3) {
                                            bonusMeter.cannonsFilled();
                                            if (!autoPlay.enabled) {
                                                await bonusController.startCannonBonus();
                                                msgBus.publish('UI.updateButtons', {
                                                    help: { enabled: true }
                                                });
                                                displayList.playerNumbers.interactiveChildren = true;
                                            }
                                            resolve();
                                        } else if (_this.chestType === 'BOAT' && bonusMeter.boatsCollected() === 3) {
                                            bonusMeter.boatsFilled();
                                            if (!autoPlay.enabled) {
                                                await bonusController.startIslandBonus();
                                                msgBus.publish('UI.updateButtons', {
                                                    help: { enabled: true }
                                                });
                                                displayList.playerNumbers.interactiveChildren = true;
                                            }
                                            // await transition.to('islandBonus', gameConfig.delayBeforeTransitionToBonus);
                                            resolve();
                                        } else {
                                            resolve();
                                        }
                                    }, 550);
                                } else {
                                    meterData.win += _this.value;
                                    resolve();
                                }


                            }
                        }
                    });
                    // _this.prizeSpine.state.setAnimation(0, `Chest_Reveals/Chest_REVEAL_${_this.chestType}_1`, false);
                }

                setTimeout(() => {
                    if (this.chestType === 'LOSE') {
                        audio.play('no_prize');
                        this.setSpineState({ state: `REVEAL_${this.chestType}`, loop: false });
                        resolve();
                    }
                }, symbolRevealDelay);

                // Otherwise just a swap from the cover to the resultsContainer
                this.resultContainer.visible = true;
                this.revealing = false;
                this.revealed = true;
                this.interactive = false;
            });
        }

        reset() {
            let _this = this;
            // if (this.chestPrize !== '' && !chestsStatic) {
            if (!this.chestStatic) {
                // Unique reset animation trigger
                if (!_this.inactive) {
                    _this.chestAnim.state.setAnimation(0, `Chest${this.chestRefLand}/Chest_RESET_${this.chestRefLand}`, false);
                    // Reset symbol anim
                    if (this.chestType !== 'LOSE') {
                        if (this.chestType) {
                            this.prizeSpine.state.setAnimation(0, `Chest_Reveals/Chest_RESET_${this.chestType}_1`, false);
                        } else {
                            this.prizeSpine.state.setAnimation(0, `Chest_Reveals/Chest_RESET_WIN_1`, false);
                        }
                    } else {
                        this.prizeSpine.state.clearTrack(0);
                        this.prizeSpine.skeleton.setToSetupPose(0);
                    }
                    audio.play('chest_reset');
                } else {
                    _this.inactive = false;
                    _this.setSpineState({ state: 'OFF', loop: false });
                    this.prizeSpine.state.clearTrack(0);
                    this.prizeSpine.skeleton.setToSetupPose(0);
                }
                this.chestStatic = true;
            }


            // _this.setSpineState({ state: 'OFF', loop: false });
            utils.removeSpineListeners(_this.chestAnim);

            this.chestAnim.renderable = true;
            this.chestPrize = '';
            this.symbolCode = '';
            this.symbolLetter = '';
            this.winAmount.text = '';
            // if(this.symbol.spine){this.symbol.spine.destroy()};
            this.enabled = false;
            this.resultContainer.visible = false;
            this.revealed = false;
            this.revealing = false;
            this.opened = false;
            this.number = undefined;
            this.alpha = 1;

            this.currentState = 'idle';
        }

    }

    return NumberCard;
});