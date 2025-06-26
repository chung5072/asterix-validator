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

    // ! 8비트
    if ((len % 2) != 0) {
        throw new Error('데이터 구조 오류 – 데이터 길이 제약 위반');
    }

    // * 16진수 문자열을 바이트 배열로 변환
    const bitArr = new Uint8Array(len / 2);
    // * 검증용 데이터 - 데이터 총 길이 
    let lenInfo = '';

    for (let index = 0; index < len; (index += 2)) {
        // * 2자리씩 끊어서 처리
        const eachStr = input.substring(index, (index + 2));

        // * 데이터 길이 부분
        if (index === 2 || index === 4) {
            lenInfo += eachStr;
            // 해당 위치는 0으로 임시 저장
            bitArr[index / 2] = 0;
            continue;
        }

        // * 8비트로 변환
        const eachBit = parseInt(eachStr, 16);

        // ! 16진수
        if (isNaN(eachBit)) {
            throw new Error('데이터 구조 오류 - Asterix 규격에 부합하지 않는 데이터');
        }

        bitArr[index / 2] = eachBit;
    }

    // ! 카테고리
    if (isInvalidCategory(bitArr[0])) {
        throw new Error('데이터 구조 오류 - Asterix에 정의되지 않는 Category');
    }

    // ! 전체 데이터 길이
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

/**
 * invalidCategory
 * 참이면 존재하지 않은 카테고리
 * @param value 확인해야 할 카테고리 값
 * @returns 
 */
const isInvalidCategory = (value: number): boolean => {
    // ! 6, 26 ~ 29, 35 ~ 47, 49 ~ 52, 54 ~ 60, 64, 66 ~ 93, 95 ~ 127
    // ! 131 ~ 149, 154, 161 ~ 179, 181 ~ 200, 202, 206 ~ 236, 256 ~
    return (
        value === 6 ||
        (value >= 26 && value <= 29) ||
        (value >= 35 && value <= 47) ||
        (value >= 49 && value <= 52) ||
        (value >= 54 && value <= 60) ||
        value === 64 ||
        (value >= 66 && value <= 93) ||
        (value >= 95 && value <= 127) ||
        (value >= 131 && value <= 149) ||
        value === 154 ||
        (value >= 161 && value <= 179) ||
        (value >= 181 && value <= 200) ||
        value === 202 ||
        (value >= 206 && value <= 236) ||
        (value >= 256)
    );
}

export { AsterixMetaInfo, strToBitArr }

