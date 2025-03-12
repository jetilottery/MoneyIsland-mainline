define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const islandSquare = require('./islandSquare');
    const islandPoints = require('./islandPoints');
    const bonusData = require('game/data/bonusData');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let squares;
    let contents;

    class islandGrid extends islandSquare {
        constructor() {
            super();
        }
    }

    function init() {
        squares = [
            setup(displayList.sq1),
            setup(displayList.sq2),
            setup(displayList.sq3),
            setup(displayList.sq4),
            setup(displayList.sq5),
            setup(displayList.sq6),
            setup(displayList.sq7),
            setup(displayList.sq8),
            setup(displayList.sq9)
        ];

        squares.forEach((sq) => {
            sq.initSpine();
            sq.reset();
        });

        bonusData.islandData.squares = squares;

        idleSync();
    }

    function reInit() {
        contents = [displayList.islandGrid, displayList.totalPoints, displayList.totalPointsTitle];
        contents.forEach(e => {
            e.visible = false;
            e.alpha = 0;
        });
    }

    function setup(container) {
        const sq = new islandGrid();
        container.addChild(sq);
        return sq;
    }

    function idleSync() {
        const sq = new islandGrid();
        sq.scale.set(0);
        displayList.islandBonus.addChild(sq);
        sq.initSpine();
        sq.idle();
        sq.spine.state.addListener({
            complete: function (entry) {
                if (entry.animation.name === 'HighLight_LOOP') {
                    let rollover = squares.filter(sq => {
                        return sq.rolloverState;
                    });
                    if (rollover.length === 0) {
                        squares.forEach((sq) => {
                            if (sq.idlePending && !sq.pending) {
                                sq.idle();
                            }
                        });
                    }
                }
            }
        });
    }

    function enable() {

        squares.forEach((sq) => {
            sq.enable();
        });
    }

    function reset() {
        squares.forEach((sq) => {
            sq.reset();
        });
        islandPoints.reset();
        islandPoints.updateTarget();
    }

    function showGrid(delay) {
        islandPoints.reset();
        contents.forEach(e => {
            e.visible = true;
            e.alpha = 0;

            new Tween(e, 0.5, {
                alpha: 1,
                delay: delay
            });
        });
    }

    function hideGrid() {
        contents.forEach(e => {
            e.visible = true;
            e.alpha = 1;

            new Tween(e, 0.5, {
                alpha: 0,
                onComplete: function () {
                    e.visible = false;
                    e.alpha = 0;
                }
            });
        });
    }

    return {
        init,
        reInit,
        enable,
        showGrid,
        hideGrid,
        reset
    };
});