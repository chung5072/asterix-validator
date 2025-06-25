interface AsterixMetaInfo {
    category: number,
    length: number,
    bitArr: Uint8Array
}

/**
 * strToBitArr
 * 문자열 -> 8비트 배열로 변환
 * @param input 문자열
 * @returns 8비트 배열
 */
const strToBitArr = (input: string): AsterixMetaInfo => {
    // 입력받는 16진수 문자열 길이
    const len = input.length;

    // ! 길이가 짝수가 아니면 에러
    if ((len % 2) != 0) {
        throw new Error('데이터 구조 오류 – 데이터 길이 제약 위반');
    }

    // * 16진수 문자열을 바이트 배열로 변환
    const bitArr = new Uint8Array(len / 2);
    // * 검증용 데이터 - 데이터 총 길이 
    let lenInfo = '';

    for (let index = 0; index < len; (index += 2)) {
        // 2자리씩 끊어서 처리
        const eachStr = input.substring(index, (index + 2));

        // * 데이터 길이 부분
        if (index === 2 || index === 4) {
            lenInfo += eachStr;
            // 해당 위치는 0으로 임시 저장
            bitArr[index / 2] = 0;
            continue;
        }

        // 8비트로 변환
        const eachBit = parseInt(eachStr, 16);

        // ! 16진수로 이뤄진 문자열이 아니면 에러
        if (isNaN(eachBit)) {
            throw new Error('데이터 구조 오류 - Asterix 규격에 부합하지 않는 데이터');
        }

        bitArr[index / 2] = eachBit;
    }

    // ! 데이터의 총 길이와 맞지 않으면 에러
    const validForLen = parseInt(lenInfo, 16);

    if (validForLen != bitArr.length) {
        throw new Error('데이터 구조 오류 - 불완전한 데이터 감지')
    }

    // 임시로 첫 번째와 두 번째 인덱스에 0으로 저장
    bitArr[1] = 0;
    bitArr[2] = 0;
    
    return {
        category: bitArr[0],
        length: validForLen,
        bitArr: bitArr
    };
}

export { strToBitArr, AsterixMetaInfo }