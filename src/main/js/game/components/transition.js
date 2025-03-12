define(require => {
    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const utils = require('game/components/utils/utils');
    const gameData = require('game/data/gameData');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    const transitionNames = {
        'baseGame': 'Transition',
        'cannonBonus': 'Transition_Cannon',
        'islandBonus': 'Transition_Ship',
    };

    let transitionSpine;

    let currentGame = 'baseGame';

    function init() {
        transitionSpine = new PIXI.spine.Spine(resLib.spine['Transition'].spineData);
        displayList.transitions.addChild(transitionSpine);
        transitionSpine.visible = false;
    }

    async function to(nextView, delay) {
        let bgMusic;
        displayList.islandScrollButton.interactive = false;
        displayList.bonusRevealAll.interactive = false;

        Tween.delayedCall(delay, () => {

            utils.removeSpineListeners(transitionSpine);
            transitionSpine.visible = true;
            transitionSpine.state.setAnimation(0, transitionNames[nextView], false);

            switch (nextView) {
                case 'baseGame':
                    audio.play('Bonus_Transition', false, 0.7);
                    bgMusic = 'BG_music';
                    Tween.delayedCall(1.3, () => {
                        fade(displayList[currentGame + 'BG'], displayList[nextView + 'BG']);
                        swap(null, displayList[nextView + 'FG']);
                        swap(null, displayList.logoContainer);
                        swap(displayList.cannonBonus);
                        swap(displayList.islandBonus);
                        swap(null, displayList.playerNumbers);
                        swap(null, displayList.infoArea);

                        currentGame = nextView;
                    });
                    break;
                case 'cannonBonus':
                    audio.play('Bonus_Transition', false, 0.7);
                    bgMusic = 'cannon_bonus_music';
                    Tween.delayedCall(1.5, () => {
                        // Fade the backgrounds and game elements
                        fade(displayList[currentGame + 'BG'], displayList[nextView + 'BG']);
                        swap(displayList[currentGame + 'FG'], null);
                        swap(displayList.logoContainer);
                        swap(displayList.playerNumbers);
                        swap(displayList.infoArea);
                        swap(displayList.islandBonus);
                        swap(null, displayList.cannonBonus);

                        currentGame = nextView;
                    });
                    break;
                case 'islandBonus':
                    audio.play('Bonus_Transition', false, 0.7);
                    bgMusic = 'island_bonus_music';
                    Tween.delayedCall(1.5, () => {
                        // Fade the backgrounds and game elements
                        fade(displayList[currentGame + 'BG'], displayList[nextView + 'BG']);
                        swap(displayList[currentGame + 'FG'], null);
                        swap(displayList.logoContainer);
                        swap(displayList.playerNumbers);
                        swap(displayList.infoArea);
                        swap(displayList.cannonBonus);
                        swap(null, displayList.islandBonus);

                        currentGame = nextView;
                    });
                    break;
            }
        });

        return new Promise(resolve => {
            Tween.delayedCall(delay + 3.5, () => {
                // Dont restart bonus music if transitioning into bonus again
                if (!audio.isPlaying(bgMusic)) {
                    audio.stop('BG_music');
                    if (bgMusic !== 'BG_music' || gameData.bgActive) {
                        audio.stop('cannon_bonus_music');
                        audio.stop('island_bonus_music');
                        audio.play(bgMusic, true);
                    }
                }

                if (nextView === 'cannonBonus') {
                    displayList.bonusRevealAll.interactive = true;
                }

                if (nextView === 'islandBonus') {
                    displayList.islandScrollButton.interactive = true;
                }
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
            });
        }
    }

    /**
     * Simplified 'to' but no tween
     */
    function swap(from, to) {
        if (from) {
            from.visible = false;
            from.alpha = 1;
        }
        if (to) {
            to.visible = true;
            to.alpha = 1;
        }
    }

    return {
        init,
        to,
    };
});