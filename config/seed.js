'use strict';

module.exports = (db) => {
    try {
        [ route2(db), chat(db), profile(db), user(db)];
    }
    catch(e) { console.log(`[[[${e} in seed file!`); } //eslint-disable-line
};

function route2(db) {
    let route2chat = [];
    for (let i = 0; i < 100; i++) {
        route2chat.push({
            name: `erguono ${i}`,
            content: `test chatting ${i}`
        });
    }
    db.Route2.bulkCreate(route2chat);
}

function chat(db) {
    let chatting = [];
    for (let i = 0; i < 100; i++){
        chatting.push({
            name: 'erguono',
            content: `test chatting ${i}`
        });
    }
    db.Chat.bulkCreate(chatting);
}

function profile(db){
    let stack = [{ skill: 'HTML5', type: 'Front', description: '웹 마크업', mastery: 65 },{ skill: 'CSS3', type: 'Front', description: '웹 마크업 디자인', mastery: 60 }, { skill: 'Javascript', type: 'Front', description: '주요 활용 언어', mastery: 55 }, { skill: 'Node.js', type: 'Back', description: '자바스크립트 서버 런타임', mastery: 45 }, { skill: 'Angular.js', type: 'Front', description: '웹 프레임워크', mastery: 30 }, { skill: 'React.js', type: 'Front', description: '웹 프레임워크', mastery: 35 }];
    db.Profile.bulkCreate(stack);
}

function user(db){
    let _administrator = {email: 'erguono@naver.com', password: 'rudgnstls2', phone: '01053852384', roles: ['admin', 'user'], age: 22 };
    db.User.create(_administrator);
}
