import { strToBitArr } from "./utils/convert";

interface AsterixMetaInfo {
    category: number,
    length: number,
    bitArr: Uint8Array
}

/**
 * inputData
 * 데이터를 입력받는 함수
 * @param input 문자열
 */
const inputData = (input: string): AsterixMetaInfo => {
    // 8bit 배열로 변환한 결과
    let bitArr: Uint8Array;

    try {
        bitArr = strToBitArr(input);
    } catch (error) {
        throw error;
    }

    return {
        category: bitArr[0],
        length: bitArr[1],
        bitArr: bitArr
    }
}

export { inputData }
