'use strict';

let async = require('async');

module.exports = (db, nextStep) => {
    try { route2(db, nextStep);
        chat(db, nextStep);
        profile(db, nextStep);
    } catch(e) { console.log(e); }
};

function route2(db, nextStep) {
    async.waterfall([
        (nextStep) => {
            let route2chat = [];
            for (let i = 0; i < 100; i++) {
                route2chat.push({
                    name: 'erguono' + i,
                    content: 'test chatting' + i,
                });
            }
            nextStep(null, route2chat);
        },
        (route2chat, nextStep) => {
            db.Route2.bulkCreate(route2chat)
                .then(nextStep()).catch(nextStep);
        }
    ], (err, result) => {
        console.log(err);
    });
}

function chat(db, nextStep) {
    async.waterfall([
        (nextStep) => {
            let chatting = [];
            for (let i = 0; i < 100; i++) {
                chatting.push({
                    name: 'erguono',
                    content: 'test chatting' + i,
                });
            }
            nextStep(null, chatting);
        },
        (chatting, nextStep) => {
            db.Chat.bulkCreate(chatting)
                .then( nextStep()).catch(nextStep);
        }
    ], (err, result) => {
        console.log(err);
    });
}

function profile(db, nextStep){
    let stack = [{ skill: 'HTML5', type: 'Front', description: '웹 마크업', mastery: 75 },{ skill: 'CSS3', type: 'Front', description: '웹 마크업 디자인', mastery: 70 }, { skill: 'Javascript', type: 'Front', description: '주요 활용 언어', mastery: 40 }, { skill: 'Node.js', type: 'Back', description: '비동기 이벤트 기반 런타임', mastery: 40 }, { skill: 'Angular.js', type: 'Front', description: '비동기 웹 프레임워크', mastery: 30 }];
    try { db.Profile.bulkCreate(stack); } catch(e){ console.log(e); }
}
