class PlayerTwo {

    constructor() {
        this.init();
    }

    init() {
        this.bitBoard = bigInt(0, 2);
        this.setBitBoard(bigInt(0,2));
    }



    setBitBoard(newMove) {
        this.bitBoard = this.bitBoard.xor(newMove);
        print(`inside setBitBoard: ${this.bitBoard}`)
    }

    getBitBoard() {
        return this.bitBoard;
    }
}