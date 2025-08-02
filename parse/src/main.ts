import parseDSL from "./parseDSL";

const dslText = `
title: 친구 키
type: line
x: 이름
y: 키
data:
민호,180
민서,173
주현,168
`

console.log(parseDSL(dslText))