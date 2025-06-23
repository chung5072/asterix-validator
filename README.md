# asterix-validator
### 기능
**Asterix 데이터의 종류와 전체 길이 및 유효성 검증 모듈**

- 모듈로 확인할 수 있는 내용
    - Category: 입력한 Asterix 데이터의 종류
    - Length: 입력한 Asterix 데이터의 전체 길이
    - 8Bit Array: 입력한 Asterix 문자열 데이터를 8비트 단위로 처리할 수 있도록 10진수로 변환한 값

**기술 스택**

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

---
### 설치 방법
```
npm install asterix-validator
```
---
### 사용 예시
```
inputData("확인하고_싶은_데이터_문자열");
```
**결과 구조**
```
/* typescript */
interface AsterixMetaInfo {
    category: number,   // Category
    length: number,     // Length
    bitArr: Uint8Array  // 8bitArray
}
```
**예시 1 - Asterix 데이터 구조가 맞는 경우**
```
console.log(inputData("3E0006800102"));
```
**예시 2 - Asterix 데이터 구조에 맞지 않는 경우**
```
console.log(inputData("hello"));
```
---
### 참고 링크
[Total Category](https://www.eurocontrol.int/publication/list-asterix-categories-and-their-statuses)

[Asterix CAT021](https://www.eurocontrol.int/publication/cat021-eurocontrol-specification-surveillance-data-exchange-asterix-part-12-category-21)

[Asterix CAT062](https://www.eurocontrol.int/publication/cat062-eurocontrol-specification-surveillance-data-exchange-asterix-part-9-category-062)

