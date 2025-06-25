import { strToBitArr, AsterixMetaInfo } from "./utils/convert";

/**
 * inputData
 * 데이터를 입력받는 함수
 * @param input 문자열
 */
const inputData = (input: string): AsterixMetaInfo => {
    // 8bit 배열로 변환한 결과
    let result: AsterixMetaInfo;

    try {
        result = strToBitArr(input)
    } catch (error) {
        throw error;
    }

    return result;
}

export { inputData }