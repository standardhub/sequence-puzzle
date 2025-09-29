$(document).ready(function () {
    class Game {
        constructor() {
            this.gameOver = false;
            this.numbers = [8, 5, 1, 2, 4, 7, 3, 6, 0];
            this.blank = 8;
            this.positions = [
                { x: 1, y: 1 },
                { x: 2, y: 1 },
                { x: 3, y: 1 },
                { x: 1, y: 2 },
                { x: 2, y: 2 },
                { x: 3, y: 2 },
                { x: 1, y: 3 },
                { x: 2, y: 3 },
                { x: 3, y: 3 }
            ];
            this.step = 0;
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

        // Make sequence numbers to random numbers that can be made sequence
        random() {
            for (let i = 0; i < 1000; i++) {
                let id = Math.floor((Math.random() * 10) % 9);
                let arrow = this.getArrow(id, this.blank);
                if (arrow) {
                    this.numbers[this.blank] = this.numbers[id];
                    this.numbers[id] = 0;
                    this.blank = id;
                }
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
                setTimeout(() => {
                    $(".modal-text").text("You Win!");
                    $("#end_modal").show();
                }, 600);
            }
            $("#step").text(this.step);
        }

        // Get click event from number button
        clickButton(id) {
            let arrow = this.getArrow(id, this.blank);
            if (arrow) {
                this.step++;
                if (this.step <= 100 && !this.gameOver) {
                    $(`#${id}`).addClass(`${arrow}`);
                    setTimeout(() => {
                        this.positions[this.blank].val = this.positions[id].val;
                        this.positions[id].val = 0;
                        this.blank = id;
                        this.displayNumber();
                        $(`#${id}`).removeClass(`${arrow}`);
                    }, 250);
                };

                if (this.step == 100) {
                    setTimeout(() => {
                        $(".modal-text").text("Gave Over!");
                        $("#end_modal").show();
                    }, 300);
                };
            };
        }

        startGame() {
            this.random();
            this.assign();
            this.displayNumber();
        }
    }

    let newGame = new Game();

    newGame.startGame();

    $('.num-btn').click(function () {
        let id = $(this).attr("id");
        newGame.clickButton(id);
    });

    $(".close-modal").click(() => {
        $(".end-modal").hide();
    });
})