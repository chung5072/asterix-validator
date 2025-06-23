import { inputData } from "../main/app";

test('err test 01', () => {
    expect(() => { inputData("hello") }).toThrow(Error);
    expect(() => { inputData("hello") }).toThrow('데이터 구조 오류 – 데이터 길이 제약 위반');
});

test('err test 02', () => {
    expect(() => { inputData("hello1") }).toThrow(Error);
    expect(() => { inputData("hello1") }).toThrow('데이터 구조 오류 - Asterix 규격에 부합하지 않는 데이터');
});

test('err test 03', () => {
    expect(() => { inputData("3E00068001") }).toThrow(Error);
    expect(() => { inputData("3E00068001") }).toThrow('데이터 구조 오류 - 불완전한 데이터 감지');
});

test('parse test - category', () => {
    const testCategory = inputData("3E0006800102").category;

    expect(testCategory).toBe(62);
});


test('parse test - total len', () => {
    const testLength = inputData("3E0006800102").length;

    expect(testLength).toBe(6);
});