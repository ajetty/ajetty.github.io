class GameController {
    winningComboCalcNumber;

    constructor(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.playerOneTurn = true;
        this.gameOver = false;
        this.turnOn = false;

        print("start game");
    }

    gameLoop() {
        if (this.playerOneTurn && this.gameOver == false) {
            print(`One`);
            if (this.turnOn) {
                print(`p1 move: ${this.movement}`)
                let turn = movePlayer(this.movement, this.playerOne.getBitBoard(), this.playerTwo.getBitBoard());
                //print(`p1 turn: ${turn}`)
                this.playerOne.setBitBoard(turn);
                //print(`Player One Turn: ${this.playerOne.getBitBoard()}`);
                this.turnOn = false;
                //print(`LOG P1: ${turn}`)
                receiveTurn(Math.log2(turn));
                [this.gameOver, this.winningComboCalcNumber] = checkWin(this.playerOne.getBitBoard());
                print(`p1 win: ${this.gameOver}`)
                if (this.gameOver) {
                    let id = Math.log2(turn);
                    let winningCombo = this.getWinningCombo(id, this.playerOne.getBitBoard(), this.winningComboCalcNumber);;
                    receiveGameOver(this.playerOneTurn, winningCombo);
                }
                this.playerOneTurn = !this.playerOneTurn;

            }
        } else if (this.gameOver == false) {
            print(`Two`)
            if (this.turnOn) {
                //print(`p2 move: ${this.movement}`)
                let turn = movePlayer(this.movement, this.playerTwo.getBitBoard(), this.playerOne.getBitBoard());
                this.playerTwo.setBitBoard(turn);
                //print(`Player Two Turn: ${this.playerTwo.getBitBoard()}`);
                this.turnOn = false;
                //print(`LOG P2: ${Math.log2(turn)}`)
                receiveTurn(Math.log2(turn));
                [this.gameOver, this.winningComboCalcNumber] = checkWin(this.playerTwo.getBitBoard())
                print(`p2 win: ${this.gameOver}`)
                if (this.gameOver) {
                    let id = Math.log2(turn);
                    let winningCombo = this.getWinningCombo(id, this.playerTwo.getBitBoard(), this.winningComboCalcNumber);
                    receiveGameOver(this.playerOneTurn, winningCombo, this.winningComboCalcNumber, id);
                }
                this.playerOneTurn = !this.playerOneTurn;

            }
        }
    }


    receiveGUIMove(move) {
        this.turnOn = true
        this.movement = this.makeBinary(bigInt(move));
    }

    makeBinary(move) {

        let number = bigInt(2).pow(move);

        print(`move ${number}`)

        return number;

    }

    makeDecimal(turn) {
        return Math.log2(turn);
    }

    getWinningCombo(id, bitboard, calcNumber) {
        let combo = [];

        let arrayBitBoard = bitboard.toArray(2);

        let length = arrayBitBoard.value.length;

        print(`length: ${length}`)


        let bit1 = arrayBitBoard.value[length - id - 1]
        let bit2 = arrayBitBoard.value[length - id - 1 - calcNumber]
        let bit3 = arrayBitBoard.value[length - id - 1 - calcNumber * 2]
        let bit4 = arrayBitBoard.value[length - id - 1 - calcNumber * 3]
        let bit5 = arrayBitBoard.value[length - id - 1 + calcNumber]
        let bit6 = arrayBitBoard.value[length - id - 1 + calcNumber * 2]
        let bit7 = arrayBitBoard.value[length - id - 1 + calcNumber * 3]

        print(`${bit1}, ${bit2}, ${bit3}, ${bit4}`)
        print(`${bit1}, ${bit5}, ${bit6}, ${bit7}`)

        print(`${length - id - 1}, ${length - id - 1 - calcNumber}, ${length - id - 1 - calcNumber * 2}, ${length - id - 1 - calcNumber * 3}`)
        print(`${length - id - 1}, ${length - id - 1 + calcNumber}, ${length - id - 1 + calcNumber * 2}, ${length - id - 1 + calcNumber * 3}`)

        combo.push(id);

        if (bit2 === 1 && bit3 === 1 && bit4 === 1) {
            combo.push(id + calcNumber);
            combo.push(id + calcNumber * 2);
            combo.push(id + calcNumber * 3);
        } else if (bit5 === 1 && bit6 === 1 && bit7 === 1) {
            combo.push(id - calcNumber);
            combo.push(id - calcNumber * 2);
            combo.push(id - calcNumber * 3);
        } else if (bit2 === 1 && bit3 === 1 && bit5 === 1) {
            combo.push(id + calcNumber);
            combo.push(id + calcNumber * 2);
            combo.push(id - calcNumber);
        } else if (bit5 === 1 && bit6 === 1 && bit2 === 1) {
            combo.push(id - calcNumber);
            combo.push(id - calcNumber * 2);
            combo.push(id + calcNumber);
        }

        print(`${bit2 === 1 && bit3 === 1 && bit7 === 1}`)
        print(`${bit5 === 1 && bit6 === 1 && bit7 === 1}`)
        print(`${bit2 === 1 && bit3 === 1 && bit5 === 1}`)
        print(`${bit5 === 1 && bit6 === 1 && bit2 === 1}`)


        print(`${arrayBitBoard.value}`);
        print(`${combo}`);

        return combo;

    }

}
