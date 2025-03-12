define(require => {
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const utils = require('game/components/utils/utils');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const sparkCreator = require('game/components/sparkCreator');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    const cannonStartPoints = {
        'portrait': {
            'L': [210, 1090],
            'M': [405, 1070],
            'R': [600, 1090],
        },
        'landscape': {
            'L': [540, 580],
            'M': [720, 550],
            'R': [900, 580],
        }
    };

    let cannonBallXTween, cannonBallScaleTween, cannonBallYTween;

    class CannonPicker extends Pressable {
        constructor() {
            super();

            this.WIDTH = 154;
            this.HEIGHT = 154;

            this.spineAnim = undefined;

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            // this.addChild(this.resultContainer);

            // State
            this.revealed = false;
            this.revealing = false;

            // Interactivity
            this.hitArea = new PIXI.Rectangle(
                this.WIDTH / -2,
                this.HEIGHT / -2,
                this.WIDTH,
                this.HEIGHT
            );
            this.on('press', () => {
                this.reveal();
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
            _this.spineAnim = new PIXI.spine.Spine(resLib.spine['Cannon_Bonus_Boats'].spineData);
            _this.defaultState = '_IDLE';
            _this.setSpineState({ state: 'DEFAULT', loop: false });
            _this.addChildAt(_this.spineAnim, 0);
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;
            });
        }

        populate(val) {
            this.value = val;
        }

        prompt() {
            this.setSpineState({ state: 'IDLE', loop: true });
        }

        stopIdle() {
            this.setSpineState({ state: 'DEFAULT', loop: false });
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        rollover() {
            msgBus.publish('Game.StopIdle');
            const evt = (this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            msgBus.publish(evt + 'Over', this);
            if (!this.revealed) {
                this.setSpineState({ state: 'ROLLOVER', loop: true });
            }
        }

        stopRollover() {
            const _this = this;
            if (_this.interactionState !== 'ROLLOVER' || _this.revealed) {
                return;
            } else {
                _this.setSpineState({ state: 'ROLLOUT', loop: false });
            }
        }

        setSpineState(data) {
            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            switch (data.state) {
                case 'DEFAULT':
                    nextState = this.defaultState;
                    break;
                case 'IDLE':
                    nextState = '_IDLE';
                    break;
                case 'ROLLOVER':
                    // nextState = 'BonusNumber_MOUSEOVER';
                    nextState = '_ON_CLICK';
                    break;
                case 'ROLLOUT':
                    // nextState = 'BonusNumber_MOUSEOUT';                    
                    nextState = this.defaultState;
                    break;
                case 'REVEAL_COLLECT':
                    nextState = '_REVEAL_COLLECT';
                    break;
                case 'REVEAL_VALUE':
                    nextState = '_REVEAL_VALUE';
                    break;
                case 'LOOP_COLLECT':
                    nextState = 'Boat1/Boat1_REVEAL_COLLECT_LOOP';
                    this.spineAnim.state.setAnimation(syncTime, nextState, doLoop);
                    return;
                case 'LOOP_VALUE':
                    nextState = 'Boat1/Boat1_REVEAL_VALUE_LOOP';
                    this.spineAnim.state.setAnimation(syncTime, nextState, doLoop);
                    return;
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
            this.spineAnim.renderable = data.state !== 'OFF';
            this.spineAnim.state.setAnimation(syncTime, `Boat${this.boatNum}/Boat${this.boatNum}${nextState}`, doLoop);
        }

        reset() {
            this.enabled = false;
            this.resultContainer.visible = false;
            this.revealed = false;
            this.revealing = false;
            this.number = undefined;
            this.alpha = 1;

            if (this.spineAnim) {
                utils.removeSpineListeners(this.spineAnim);
                utils.stopSpineAnim(this.spineAnim);
                this.setSpineState({ state: 'DEFAULT', loop: false });
            }
        }

        async shootCannon() {
            await new Promise(resolve => {
                let shootDirection;
                let cannonBall = displayList.cannonBall.children[0];
                let O = orientation.get();
                let dir = this.direction[O];

                if (cannonBallXTween) {
                    cannonBallXTween.kill();

                }
                if (cannonBallYTween) {
                    cannonBallYTween.kill();

                }
                if (cannonBallScaleTween) {
                    cannonBallScaleTween.kill();

                }

                switch (dir) {
                    case 'L':
                        shootDirection = 'Cannon_SHOOT_LEFT';
                        cannonBall.x = cannonStartPoints[O][dir][0];
                        cannonBall.y = cannonStartPoints[O][dir][1];
                        break;
                    case 'M':
                        shootDirection = 'Cannon_SHOOT_MIDDLE';
                        cannonBall.x = cannonStartPoints[O][dir][0];
                        cannonBall.y = cannonStartPoints[O][dir][1];
                        break;
                    case 'R':
                        shootDirection = 'Cannon_SHOOT_RIGHT';
                        cannonBall.x = cannonStartPoints[O][dir][0];
                        cannonBall.y = cannonStartPoints[O][dir][1];
                        break;
                }

                utils.removeSpineListeners(displayList.cannonSpine);
                displayList.cannonSpine.state.addListener({
                    complete: function(entry) {
                        if (entry.animation.name === shootDirection) {
                            displayList.cannonSpine.state.setAnimation(0, 'Cannon_IDLE', true);
                            displayList.cbBGSpine.state.setAnimation(0, 'Cannon_BG_IDLE', true);
                            utils.removeSpineListeners(displayList.cannonSpine);
                        }
                    }
                });


                new Tween.to({}, 0.3, {
                    onComplete: () => {
                        cannonBall.visible = true;
                        cannonBall.scale.set(1);

                        cannonBallXTween = new Tween.to(cannonBall, 0.4, {
                            x: this.parent.x,
                            ease: "Power1.easeIn",
                        });

                        cannonBallYTween = new Tween.to(cannonBall, 0.4, {
                            y: this.parent.y,
                            ease: "Power0.easeOut",
                            onComplete: () => {
                                cannonBall.visible = false;
                            }
                        });

                        cannonBallScaleTween = new Tween.to(cannonBall.scale, 0.5, {
                            x: 0.3,
                            y: 0.3,
                            ease: "Power0.easeIn"
                        });



                    }
                });

                Tween.delayedCall(0.7, resolve);
                // displayList.cbBGSpine.state.setAnimation(0, 'Cannon_BG_SHOOT', false);
                displayList.cannonSpine.state.setAnimation(0, shootDirection, false);

            });
        }

        async uncover(prize, updateMeter) {
            await new Promise(async (resolve) => {
                this.interactive = false;
                this.revealing = true;

                // Play the Player Number reveal audio
                audio.play('shoot_cannon', false);

                var globalScope = this;

                globalScope.resultContainer.visible = true;
                globalScope.resultContainer.alpha = 1;

                if (prize === 'X') {
                    msgBus.publish('UI.updateButtons', {
                        help: { enabled: false }
                    });
                }

                await this.shootCannon();

                if (prize !== 'X') {
                    utils.removeSpineListeners(globalScope.spineAnim);
                    if (prize === 'M') {
                        this.addMultiplierText(this.spineAnim); //spineAnim, slotName, source
                        // Spark
                        let xPos = orientation.get() === 'landscape' ? 880 : 560;
                        new Tween.to({}, 1, {
                            onComplete: () => {
                                let spark = new sparkCreator();
                                spark.animate({ x: this.parent.x, y: this.parent.y }, { x: xPos, y: 100 }, 0.5);
                            }
                        });
                    } else {
                        this.addValueText(this.spineAnim); //spineAnim, slotName, source
                        // Spark
                        let xPos = orientation.get() === 'landscape' ? 550 : 210;
                        new Tween.to({}, 1, {
                            onComplete: () => {
                                let spark = new sparkCreator();
                                spark.animate({ x: this.parent.x, y: this.parent.y }, { x: xPos, y: 100 }, 0.5);
                            }
                        });
                    }
                    this.setSpineState({ state: 'REVEAL_VALUE', loop: false });

                    audio.playSequential('boatWin', false, 0.7);

                    new Tween.to({}, 1.3, {
                        onComplete: () => {
                            updateMeter(prize);
                        }
                    });

                    globalScope.spineAnim.state.addListener({
                        complete: function(entry) {
                            if (entry.animation.name === `Boat${globalScope.boatNum}/Boat${globalScope.boatNum}_REVEAL_VALUE`) {
                                // globalScope.setSpineState({ state: 'OFF', loop: false });
                                globalScope.revealing = true;
                                globalScope.revealed = true;
                                globalScope.setSpineState({ state: 'LOOP_VALUE', loop: true });
                                utils.removeSpineListeners(globalScope.spineAnim);
                                resolve();
                            }
                        }
                    });

                } else {
                    utils.removeSpineListeners(globalScope.spineAnim);
                    this.addCollectText(this.spineAnim); //spineAnim, slotName, source
                    this.setSpineState({ state: 'REVEAL_COLLECT', loop: false });

                    audio.play('boat_collect', false);
                    globalScope.spineAnim.state.addListener({
                        complete: function(entry) {
                            if (entry.animation.name === `Boat${globalScope.boatNum}/Boat${globalScope.boatNum}_REVEAL_COLLECT`) {
                                // globalScope.setSpineState({ state: 'OFF', loop: false });
                                globalScope.revealing = true;
                                globalScope.revealed = true;
                                globalScope.setSpineState({ state: 'LOOP_COLLECT', loop: true });
                                utils.removeSpineListeners(globalScope.spineAnim);
                                resolve();
                            }
                        }
                    });
                }
                // Disable interactivity to prevent re-reveal, then switch to the animation
                // this.setSpineState({ state: 'REVEAL', loop: false });

                // Otherwise just a swap from the cover to the resultsContainer
                this.resultContainer.visible = true;
                this.revealing = false;
                this.revealed = true;
                this.interactive = false;
            });
        }

    }

    return CannonPicker;
});