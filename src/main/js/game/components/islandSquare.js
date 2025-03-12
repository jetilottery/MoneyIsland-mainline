define(require => {
    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const utils = require('game/components/utils/utils');
    const bonusMeter = require('game/components/bonusMeter');
    const bonusData = require('game/data/bonusData');

    let selected = 0;

    class islandSquare extends Pressable {
        constructor() {
            super();

            this.WIDTH = 152;
            this.HEIGHT = 152;

            this.spine = undefined;

            // State
            this.revealed = false;
            this.revealing = false;
            this.pending = false;

            // Interactivity
            this.hitArea = new PIXI.Rectangle(
                this.WIDTH / -2,
                this.HEIGHT / -2,
                this.WIDTH,
                this.HEIGHT
            );
            this.on('press', () => {
                if (!autoPlay.enabled) {
                    this.rolloverState = false;
                    this.enabled = false;
                    let data = bonusData.islandData;
                    this.pending = true;
                    this.select();
                    data.selectedSquares.push(this);
                    selected++;
                    if (selected === 2) {
                        displayList.islandScrollButton.visible = false;
                        displayList.islandScrollButton.enabled = false;
                        msgBus.publish('UI.updateButtons', {
                            help: { enabled: false },
                        });

                        data.selectedSquares.forEach(sq => {
                            sq.uncover();
                        });
                        data.squares.forEach(sq => {
                            sq.stopIdle();
                            sq.enabled = false;
                        });
                        msgBus.publish('game.StartPointSequence', data);
                        // islandScroll.startPointSequence(data);
                    } else {
                        data.squares.forEach((sq) => {
                            if (!sq.pending) {
                                sq.idlePending = true;
                            }
                        });
                    }
                    // await 
                    // this.reveal();
                }
            });
            //add the pointerover event
            this.off('pointerover');
            this.on('pointerover', () => {
                this.rollover();
            });
            this.off('pointerout');
            this.on('pointerout', () => {
                if (this.enabled) {
                    this.stopRollover();
                }
            });
        }

        initSpine() {
            const _this = this;
            // Set up spine project
            _this.spine = new PIXI.spine.Spine(resLib.spine['BonusIsland_MAP_SEGMENTS'].spineData);
            _this.addChild(_this.spine);

            _this.defaultState = 'HighLight_LOOP';
            _this.currentState = 'idle';

            _this.setSpineState({ state: 'IDLE', loop: true });

            bonusMeter.init();
        }

        enable() {
            bonusMeter.idle();

            this.idlePending = true;
            this.enabled = true;
        }

        populate(num) {
            // prePlay = false;
            this.pointsAwarded = num;
        }

        idle() {
            this.idlePending = false;
            this.currentState = 'idle';
            this.setSpineState({ state: 'IDLE', loop: true });
        }

        disable() {
            this.enabled = false;
            // this.reveal = undefined;
        }

        rollover() {
            // stop all idles
            this.rolloverState = true;
            let data = bonusData.islandData;
            data.squares.forEach(sq => {
                sq.stopIdle();
            });

            this.setSpineState({ state: 'ROLLOVER', loop: true });
        }

        setSpineState(data) {
            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            switch (data.state) {
                case 'STATIC':
                    nextState = 'HighLight_LOOP';
                    break;
                case 'IDLE':
                    nextState = 'HighLight_LOOP';
                    break;
                case 'ROLLOVER':
                    nextState = 'Selection';
                    break;
                case 'SELECTED':
                    nextState = 'Selection_HOLD';
                    break;
                case 'REVEAL':
                    nextState = 'Reveal';
                    break;
                case 'REVEAL_LOOP':
                    nextState = 'Reveal_LOOP';
                    break;
                case 'REVEAL_END':
                    nextState = 'Reveal_END';
                    break;
                case 'ROLLOUT':
                    nextState = 'HighLight_LOOP';
                    break;
                case 'OFF':
                    nextState = this.defaultState;
                    this.spine.state.clearTrack(0);
                    this.spine.skeleton.setToSetupPose(0);
                    break;
                default:
                    nextState = this.defaultState;
                    break;
            }
            // If we're already in a rollout state, we don't want to be forcing the state back to default
            // as this would interrupt the rollout animation, so if we're going back to default, don't do anything
            if (this.interactionState === 'ROLLOUT' && nextState === this.defaultState) {
                return;
            }

            // Store the interaction state
            this.interactionState = data.state;

            utils.log('Changing spine state to: ' + nextState);
            this.spine.renderable = data.state !== 'OFF';
            this.spine.state.setAnimation(syncTime, nextState, doLoop);
        }

        stopRollover() {
            this.rolloverState = false;

            const evt = (this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            msgBus.publish(evt + 'Out', this);
            if (this.interactionState !== 'ROLLOVER') {
                return;
            } else {
                // this.interactionState = 'ROLLOUT';
                this.idlePending = true;
                this.setSpineState({ state: 'OFF', loop: false });
                let data = bonusData.islandData;
                data.squares.forEach(sq => {
                    if (sq.currentState === 'inactive' && !sq.pending) {
                        sq.enable();
                    }
                });
            }
        }

        stopIdle() {
            this.idlePending = false;
            if (!this.revealed && !this.revealing) {
                this.spine.state.clearTrack(0);
                this.spine.skeleton.setToSetupPose();
                this.currentState = 'inactive';
                // this.enabled = false;
            }
        }

        reset() {
            let _this = this;

            _this.setSpineState({ state: 'OFF', loop: false });
            utils.removeSpineListeners(_this.spine);
            selected = 0;
            bonusData.islandData.selectedSquares = [];
            this.spine.renderable = true;
            this.pointsAwarded = '';
            this.enabled = false;
            this.revealed = false;
            this.revealing = false;
            this.pending = false;
            this.opened = false;
            this.alpha = 1;

            this.currentState = 'idle';
        }

        async uncover() {
            await new Promise(resolve => {
                audio.play('drop_anchor', false, 1);
                
                this.currentState = 'idle';

                let _this = this;

                this.setSpineState({ state: 'REVEAL', loop: false });
                this.spine.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === 'Reveal') {
                            // Play Reveal Idle
                            _this.setSpineState({ state: 'REVEAL_LOOP', loop: true });
                            // do points stuff 

                            _this.spine.state.listeners.forEach((sp) => {
                                _this.spine.state.removeListener(sp);
                            });
                            resolve();
                            this.revealing = false;
                            this.revealed = true;
                            this.pending = false;
                        }
                    }
                });
            });
        }

        select() {
            this.enabled = false;
            this.revealing = true;

            this.currentState = 'idle';

            this.setSpineState({ state: 'SELECTED', loop: true });
            audio.play('scroll_select');
        }
    }

    return islandSquare;
});
