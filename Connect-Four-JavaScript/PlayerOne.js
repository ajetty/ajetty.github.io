class PlayerOne {

    constructor() {
        this.init();
    }

    init() {
        this.bitBoard = bigInt(0, 2);
        this.setBitBoard(bigInt(0,2));
        print(`inside init: ${this.bitBoard}`)
    }



    setBitBoard(newMove) {
        this.bitBoard = this.bitBoard.xor(newMove);
        print(`inside setBitBoard: ${this.bitBoard}`)
    }

    getBitBoard() {
        return this.bitBoard;
    }
}



