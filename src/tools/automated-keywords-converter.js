const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, '../resource/pinyin-dict.txt'), (err, data) => {
    if (err)
        throw err;

    convert(data);
});

function convert(data) {
    let pinyinDict = data.toString();
    let pinyinLines = pinyinDict.split('\r\n');

    let result = [];

    let keywordsArr = new Set();

    let oneKeywords = [];
    let twoKeywords = [];

    let keywords = '';//每一个单字

    for (let i = 0; i < pinyinLines.length; i++) {
        let pinyinLine = pinyinLines[i];

        let pinyin = pinyinLine.split(' ');
        let pinyinParts = pinyin[0];//得到的数据
        let weight = pinyin[pinyin.length - 1];

        let strLen = pinyinParts.length;//每个数据的字符长度
        keywords = pinyinParts.substring(0, 1);//关键字

        //去掉单字
        let pre = '';
        let next = '';
        if (i != 0) {
            pre = (pinyinLines[i - 1].split(' ')[0]).substring(0, 1);
        }
        if (i < pinyinLines.length - 1) {
            next = (pinyinLines[i + 1].split(' ')[0]).substring(0, 1);
        }
        if (keywords !== pre && keywords !== next && strLen === 1) {
            continue;//不需要单字，跳过这次循环
        }

        if (keywordsArr.has(keywords)) {
            //这个地方很是耗费时间
            for (let r of result) {
                if (r[0] === keywords && strLen >= 2) {
                    let twoKeywords = r[1];
                    switch (strLen) {
                        case 2:
                            if (!Array.isArray(twoKeywords[0])) {
                                twoKeywords[0] = [];
                            }

                            twoKeywords[0].push(pinyinParts);
                            break;
                        case 3:
                            if (!Array.isArray(twoKeywords[1])) {
                                twoKeywords[1] = [];
                            }

                            twoKeywords[1].push(pinyinParts);
                            break;
                        case 4:
                            if (!Array.isArray(twoKeywords[2])) {
                                twoKeywords[2] = [];
                            }

                            twoKeywords[2].push(pinyinParts);
                            break;
                        case 5:
                            if (!Array.isArray(twoKeywords[3])) {
                                twoKeywords[3] = [];
                            }

                            twoKeywords[3].push(pinyinParts);
                            break;
                        case 6:
                            if (!Array.isArray(twoKeywords[4])) {
                                twoKeywords[4] = [];
                            }

                            twoKeywords[4].push(pinyinParts);
                            break;
                        case 7:
                            if (!Array.isArray(twoKeywords[5])) {
                                twoKeywords[5] = [];
                            }

                            twoKeywords[5].push(pinyinParts);
                            break;
                        case 8:
                            if (!Array.isArray(twoKeywords[6])) {
                                twoKeywords[6] = [];
                            }

                            twoKeywords[6].push(pinyinParts);
                            break;
                        case 9:
                            if (!Array.isArray(twoKeywords[7])) {
                                twoKeywords[7] = [];
                            }

                            twoKeywords[7].push(pinyinParts);
                            break;
                        case 10:
                            if (!Array.isArray(twoKeywords[8])) {
                                twoKeywords[8] = [];
                            }

                            twoKeywords[8].push(pinyinParts);
                            break;
                        case 11:
                            if (!Array.isArray(twoKeywords[9])) {
                                twoKeywords[9] = [];
                            }

                            twoKeywords[9].push(pinyinParts);
                            break;
                        case 12:
                            if (!Array.isArray(twoKeywords[10])) {
                                twoKeywords[10] = [];
                            }

                            twoKeywords[10].push(pinyinParts);
                            break;
                    }
                }
            }
        } else {
            keywordsArr.add(keywords);//关键字索引数组

            oneKeywords = [];
            twoKeywords = [];

            result.push(oneKeywords);

            oneKeywords[0] = keywords;
            oneKeywords[1] = twoKeywords;

            if (strLen > 1) {
                twoKeywords[strLen - 2] = [];
                twoKeywords[strLen - 2].push(pinyinParts);
            }
        }
    }
    fs.writeFileSync('src/lib/automated-keywords.js', JSON.stringify(result));
};

//数组按照权值进行排序
function sort(weight, arr) {
    for (let i = 0; i < arr.length; i++) {
        
    }
}