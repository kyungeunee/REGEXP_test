const str = `
010-1234-5678
thegi@naver.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
abbcccdddd
http://localhost:1234
`
//생성자 방식
// const regexp = new RegExp('the', 'gi')
// g flag(플래그): 모든 값 확인. , i : 대소문자 구분 x

//literal  방식 (위 생성자 방식과 동일)
const regexp =/the/gi
console.log(str.match(regexp)) //(3) ["the", "The", "the"]

const regexp_met =/fox/gi //fox가 있는지를 검색
console.log(regexp_met.test(str)) //true

console.log(str.replace(regexp_met, 'AAA'))
// 결과값: 
// 010-1234-5678
// thegi@naver.com
// https://www.omdbapi.com/?apikey=7035c60c&s=frozen
// The quick brown AAA jumps over the lazy dog.
// abbcccdddd


//플래그 예시
const regexp_flag = /the/
const regexp_flag_g = /the/g
const regexp_flag_gi = /the/gi

console.log(str.match(regexp_flag)) //["the", index: 15, input: "↵010-1234-5678↵thegi@naver.com↵https://www.omdbapi…ck brown fox jumps over the lazy dog.↵abbcccdddd↵", groups: undefined]
console.log(str.match(regexp_flag_g)) //(2) ["the", "the"]
console.log(str.match(regexp_flag_gi)) //(3) ["the", "The", "the"]
console.log(str.match(/the/gi)) //(3) ["the", "The", "the"]

console.log(str.match(/./gi)) // (131) ["0", "1", "0", "-", ~~~
// . 자체로는 모든 문자를 찾아주는 패턴. 명령. 
console.log(str.match(/\./gi))  //(4) [".", ".", ".", "."]
// 마침표를 찾으려면 이스케이프 문자로 변경해줘야 함.
// 이스케이프 문자 (Escape Character)란 \ (백슬래시) 기호를 통해 본래의 기능에서 벗어나 상태가 바뀌는 문자. 
// 모든 특수기호에 해당하는건 아니고, 정규표현식의 일환으로 사용가능한 것. 
console.log(str.match(/\.$/gi)) //null
// $ 앞의 단어로 끝나는 부분을 반환. 끝나는 영역에 . 이 있으면 반환하는것. abbcccdddd 뒤에 .이 없으니까 null...
console.log(str.match(/\.$/gim)) //["."]
// m 플래그를 넣으면 각각의 줄에서 끝나는 부분에 마침표 있는지를 확인해서 배열로 출력
// ~ the lazy dog. 에서 .으로 끝나니까 이를 반환한 것.
// 전체 영역에서 검색 : g, 줄바꿈이 되어져 있는 각각의 부분에서 검색하는것. : m

// 패턴 예시
console.log(
  str.match(/d$/g) //null
  //한 줄의 끝부분이 d로 끝나는 걸 확인 => 백틱 기호 바로 앞이 끝나는 곳. 아무것도 없으니까 ^^
) 
console.log(str.match(/d$/gm)) //["d"]
console.log(str.match(/^t/gm)) //["t"]
console.log(str.match(/^t/gim)) //(2) ["t", "T"]

console.log(str.match(/./g)) 
console.log(str.match(/http/g)) //["http"]
console.log(str.match(/h..p/g))  //["http"]
console.log(str.match(/j...s/g))  //["jumps"]

console.log(str.match(/fox|dog/g)) //(2) ["fox", "dog"] fox 또는 dog를 먼저 찾는걸 반환 . g이라... 둘다 출력
console.log(str.match(/http?/g)) //(2) ["http", "http"] 다 찾는거

console.log(str.match(/d{2}/g))  //(2) ["dd", "dd"]
console.log(str.match(/d{2,}/g))  //["dddd"]
console.log(str.match(/d{2,3}/g)) //["ddd"]

console.log(str.match(/\w{2,3}/g)) //(41) ["010", "123", "567", "the", "gi",~~
// \w: 숫자를 포함한 영어 알파벳 의미.
console.log(str.match(/\b\w{2,3}\b/g)) //(8) ["010", "com", "www", "com", "The", "fox", "the", "dog"]
// \b ~~ \b : 경계를 만들어줌. : 숫자나 알파벳이 아닌 다른 문자들은 경계로 쳐서 새로 count해줌


const str2 = `
010-1234-5678
thegi@naver.com
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
abbcccdddd
http://localhost:1234
동해물과_백두산이 마르고 닳도록
`


//패턴 예시2
console.log(str2.match(/[fox]/g)) //(13) ["o", "o", "o", "f", "o", "o", "f", "o", "x", "o", "o", "o", "o"]
//f 또는 o 또는 x 
console.log(str2.match(/[0-9]{1,}/g)) //6) ["010", "1234", "5678", "7035", "60", "1234"]
// 0~9까지 숫자 1개 이상이 있다면 찾아라 
console.log(str2.match(/[가-힣]{1,}/g)) //(4) ["동해물과", "백두산이", "마르고", "닳도록"]
//모든 한글 부분 찾아서 배열로 출력

console.log(str2.match(/\w/g)) //(125) ["0", "1", "0", "1", "2", "3", "4", "5", ~ , "_"]
//모든 63개의 문자 + _ 언더바까지 찾아줌
console.log(str2.match(/\bf\w{1,}\b/g)) //(2) ["frozen", "fox"]
// 63개에 일치하지 않는 문자 앞뒤: \b ~ \b로 경계를 둠. 
//f\w{1,} : f로 시작하는, 모든 63개의 문자가 1개 이상 있는 단어를 찾음., 즉, f로 시작하는 모든 단어를 찾는 것.
console.log(str2.match(/\d/g)) //(21) ["0", "1", "0", "1", "2", "3", "4", "5", "6", "7", "8", "7", "0", "3", "5", "6", "0", "1", "2", "3", "4"]
// 숫자만 검색
console.log(str2.match(/\d{1,}/g)) //(6) ["010", "1234", "5678", "7035", "60", "1234"]
// 연속된 숫자 검색
console.log(str2.match(/\s/g)) //18) ["\n", "\n", "\n", "\n", " ", " ", " ", " ", " ", " ", " ", " ", "\n", "\n", "\n", " ", " ", "\n"]
// 공백 검색

const h = ` the Hello     world!

`
console.log(h.replace(/\s/g, '')) //theHelloworld!
//모든 공백을 삭제

// @ 앞쪽 일치 작성
console.log(str2.match(/(?=@)/g)) //[""] 그냥 골뱅이 앞만 찾은 것
console.log(str2.match(/.{1,}(?=@)/g)) //["thegi"]
//@ 앞의 모든 문자 일치 . 는 모든 문자, {1,}은 1개 이상
console.log(str2.match(/\w{1,}(?=@)/g)) //["thegi"]
// @ 뒤쪽 일치 작성
console.log(str2.match(/.{1,}(?<=@)/g)) //["thegi@"]
console.log(str2.match(/(?<=@).{1,}/g)) //["naver.com"]
//뒤쪽일치는 뒤에다 작성해줘야함!