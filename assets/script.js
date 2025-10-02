$(document).ready(function () {

    class Game {
        constructor() {
            this.gameOver = false;
            this.numbers =// [1, 2, 3, 4, 5, 6, 7, 0, 8];
                this.blank = //7;
                this.positions = [
                    { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
                    { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                    { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }
                ];
            this.step = //0;
                this.time = //0;
                this.score = //[99999, 9999];
                this.interval;
        }

        // Decode arrow to move
        getArrow(a, b) {
            const x = this.positions[a].x;
            const y = this.positions[a].y;
            const xb = this.positions[b].x;
            const yb = this.positions[b].y;

            let arrow = '';
            if (x - 1 == xb && y == yb) arrow = 'left';
            if (x + 1 == xb && y == yb) arrow = 'right';
            if (y - 1 == yb && x == xb) arrow = 'up';
            if (y + 1 == yb && x == xb) arrow = 'down';

            return arrow;
        }

        // Make random number array that can be made sequence and asign it to this.numbers
        random() {
            let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 0];
            let zeroPosition = 8;
            for (let i = 0; i < 1000; i++) {
                let id = Math.floor((Math.random() * 10) % 9);
                let arrow = this.getArrow(id, zeroPosition);
                if (arrow) {
                    numberArray[zeroPosition] = numberArray[id];
                    numberArray[id] = 0;
                    zeroPosition = id;
                }
            }
            if (numberArray.toString() == '1,2,3,4,5,6,7,8,0') {
                this.random();
            } else {
                this.numbers = numberArray;
                this.blank = zeroPosition;
            }
        }

        // Assign numbers to each positions
        async assign() {
            for (let i = 0; i < this.numbers.length; i++) {
                this.positions[i].val = this.numbers[i];
                if (!this.numbers[i]) { this.blank = i; }
            };
            this.step = 0;
        }

        // Display numbers to buttons on screen
        displayNumber() {
            let sequence = '';
            $('#9').addClass('transparent');
            for (let i = 0; i < 9; i++) {
                if (this.positions[i].val) {
                    $(`#${i}`).text(this.positions[i].val);
                    $(`#${i}`).show().addClass('btn btn-secondary');
                    sequence += this.positions[i].val;
                } else {
                    $(`#${i}`).text('');
                    $(`#${i}`).hide().removeClass('btn btn-secondary');
                    sequence += '9';
                }
            };

            if (sequence == '123456789' && !this.gameOver) {
                $('#9').text('9').removeClass('transparent').addClass('btn btn-secondary zoom');
                this.gameOver = true;
                this.stopTimer();

                // Compare current score with previous score
                this.score = [this.time, this.step];
                let prevScore = localStorage.getItem('score').split(',');
                if (this.score[0] < prevScore[0] && this.score[1] < prevScore[1]) {
                    $("#score-time").text(this.time);
                    $("#score-steps").text(this.step);
                    localStorage.setItem('score', this.score.toString());
                };

                // Show Modal
                $(".modal-text").text("You Win!");
                setTimeout(() => {
                    $("#end_modal").show();
                }, 600);
            }
            $("#step").text(this.step);
        }

        // Get click event from number button
        move(id) {
            if (id >= 0 && id < 9) {
                let arrow = this.getArrow(id, this.blank);
                if (arrow) {
                    this.step++;
                    if (this.step <= 100 && !this.gameOver) {
                        $(`#${id}`).addClass(`${arrow}`);
                        this.positions[this.blank].val = this.positions[id].val;
                        this.positions[id].val = 0;
                        this.blank = id;
                        setTimeout(() => {
                            this.displayNumber();
                            $(`#${id}`).removeClass(`${arrow}`);
                        }, 260);
                    };

                    if (this.step == 100) {
                        setTimeout(() => {
                            $(".modal-text").text("Gave Over!");
                            $("#end_modal").show();
                        }, 300);
                    };
                };
            }
        }

        keyEvent() {
            window.addEventListener("keydown", e => {
                let key = e.key;
                switch (key) {
                    case 'ArrowUp':
                        this.move(this.blank + 3);
                        break;
                    case 'ArrowDown':
                        this.move(this.blank - 3)
                        break;
                    case 'ArrowLeft':
                        this.move(this.blank + 1)
                        break;
                    case 'ArrowRight':
                        this.move(this.blank - 1)
                        break;
                    default:
                        break;
                }
            })
        }

        startTimer() {
            this.time = 0;
            this.interval = setInterval(() => {
                this.time += 1;
                $("#time").text(this.time);
            }, 1000);
        }

        stopTimer() {
            clearInterval(this.interval);
        }

        displayScore() {
            let prevScore = localStorage.getItem('score');
            if (prevScore) {
                if (prevScore == '999,999') prevScore = '0,0';
                $("#score-time").text(prevScore.split(',')[0]);
                $("#score-steps").text(prevScore.split(',')[1]);
            } else {
                localStorage.setItem('score', "999,999");
            }
        }

        startGame() {
            this.displayScore();
            this.random();
            this.assign();
            this.displayNumber();
            this.startTimer();
            this.keyEvent();
        }
    }

    let newGame = new Game();

    newGame.startGame();

    $('.num-btn').click(function () {
        let id = $(this).attr("id");
        newGame.move(id);
    });

    $(".close-modal").click(() => {
        $(".end-modal").hide();
    });
})