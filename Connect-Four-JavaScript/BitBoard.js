/* A bit board corresponds to a long in the following way:
 *
 * 	 				 0  0  0  0  0  0  0  0 0<--Right Most Bit
 * 	 				 G6 F6 E6 D6 C6 B6 A6 0 0<--TOP OF VISIBLE GAME BOARD
 * 	 				 G5 F5 E5 D5 C5 B5 A5 0 0
 * 	 				 G4 F4 E4 D4 C4 B4 A4 0 0
 * 	 				 G3 F3 E3 D3 C3 B3 A3 0 0
 * 	 				 G2 F2 E2 D2 C2 B2 A2 0 0
 * Left most bit-->0 G1 F1 E1 D1 C1 B1 A1 0 0<--BOTTOM OF VISIBLE GAME BOARD
 *
 * 					  56 49 42 35 28 21 14 07 00<--BUFFER/NO ACCESS/Right Most Bit
 * 					  57 50 43 36 29 22 15 08 01<--TOP OF VISIBLE GAME BOARD
 * 					  58 51 44 37 30 23 16 09 02
 * 					  59 52 45 38 31 24 17 10 03
 * 					  60 53 46 39 32 25 18 11 04
 * 					  61 54 47 40 33 26 19 12 05
 * Left most bit-->63 62 55 48 41 34 27 20 13 06 <--BOTTOM OF VISIBLE GAME BOARD
 *
 * BigInt = 0G1G2G3G4G5G60 F1F2F3F4F5F60 E1E2E3E4E5E60 D1D2D3D4D5D60 C1C2C3C4C5C60 B1B2B3B4B5B60 A1A2A3A4A5A60 0000000 000000(0)
 */




function movePlayer(tempBoard, bitBoard1, bitBoard2) {

    let finalBoard = bitBoard1.xor(bitBoard2);

    tempBoard = drop(tempBoard, finalBoard);

    let tempBoard2 = tempBoard.or(finalBoard);

    let newPosition = tempBoard.xor(-finalBoard)

    if(tempBoard2.notEquals(finalBoard)) {
        return tempBoard;
    }
    else {
        return bigInt(0, 2);
    }


}

function drop(tempBoard, finalBoard) {

    if(tempBoard <= 4611686018427387904 && tempBoard >= 144115188075855872) {
        finalBoard = finalBoard.and(18158513697557839872);

        if(finalBoard.equals(0)) {
            return tempBoard = bigInt(4611686018427387904);
        }
    }
    else if(tempBoard <= 36028797018963968 && tempBoard >= 1125899906842624) {
            finalBoard = finalBoard.and(141863388262170624);

            if(finalBoard.equals(0)) {
                return tempBoard = bigInt(36028797018963968);
            }
    }
    else if(tempBoard <= 281474976710656 && tempBoard >= 8796093022208) {
            finalBoard = finalBoard.and(1108307720798208);

            if(finalBoard.equals(0)) {
                return tempBoard = bigInt(281474976710656);
            }
    }
    else if(tempBoard <= 2199023255552 && tempBoard >= 68719476736) {
            finalBoard = finalBoard.and(8658654068736);

            if(finalBoard.equals(0)) {
                return tempBoard = bigInt(2199023255552);
            }
    }
    else if(tempBoard <= 17179869184 && tempBoard >= 536870912) {
            finalBoard = finalBoard.and(33822867456);

            if(finalBoard.equals(0)) {
                return tempBoard = bigInt(17179869184);
            }
    }
    else if(tempBoard <= 134217728 && tempBoard >= 4194304) {
            finalBoard = finalBoard.and(264241152);

            if(finalBoard.equals(0)) {
                return tempBoard = bigInt(134217728);
            }
    }
    else if(tempBoard <= 1048576 && tempBoard >= 32768) {
            finalBoard = finalBoard.and(2064384);

            if(finalBoard.equals(0)) {
                return tempBoard = bigInt(1048576);
            }
    }

    let lowestSetBit = finalBoard.and(-finalBoard);

    let lowest = lowestSetBit.shiftRight(1);

    return lowest;

}

function checkWin(bitBoard) {
    const isAcross = checkAcross(bitBoard);
    const isUpDown = checkUpDown(bitBoard);
    const isDiagnol = checkDiagonal(bitBoard);
    const isDiagnol2 = checkDiagonal2(bitBoard);

    if(isAcross == true)
        return [true, 7];
    else if(isDiagnol == true)
        return [true, 8];
    else if(isDiagnol2 == true)
        return [true, 6];
    else if(isUpDown == true)
        return [true, 1];
    else
        return [false, 0];
}

//checks for across win from left to right
function checkAcross(bitBoard) {

    let tempBoard = bitBoard.shiftRight(7);

    tempBoard = tempBoard.and(bitBoard);

    for(let x = 0; x < 2; x++) {
        tempBoard = tempBoard.shiftRight(7);
        tempBoard = tempBoard.and(bitBoard);
    }

    print(`difference: ${Math.log2(tempBoard.minus(bitBoard))}`)

    if(tempBoard.equals(0))
        return false;
    else
        return true;

}

function checkUpDown(bitBoard) {

    let tempBoard = bitBoard.shiftRight(1);
    tempBoard = tempBoard.and(bitBoard);

    for(let x = 0; x < 2; x++) {
        tempBoard = tempBoard.shiftRight(1);
        tempBoard = tempBoard.and(bitBoard);
    }

    if(tempBoard.equals(0))
        return false;
    else
        return true;


}

//checks for diagonal win from right to left (low left to high right diagonal match up)
function checkDiagonal(bitBoard) {

    let tempBoard = bitBoard.shiftRight(8);
    tempBoard = tempBoard.and(bitBoard);

    for(let x = 0; x < 2; x++) {
        tempBoard = tempBoard.shiftRight(8);
        tempBoard = tempBoard.and(bitBoard);
    }

    if(tempBoard.equals(0))
        return false;
    else
        return true;
}

//checks for diagonal win from left to right (low right to high left diagonal match up)
function checkDiagonal2(bitBoard) {

    let tempBoard = bitBoard.shiftRight(6);
    tempBoard = tempBoard.and(bitBoard);

    for(let x = 0; x < 2; x++) {
        tempBoard = tempBoard.shiftRight(6);
        tempBoard = tempBoard.and(bitBoard);
    }

    if(tempBoard.equals(0))
        return false;
    else
        return true;
}