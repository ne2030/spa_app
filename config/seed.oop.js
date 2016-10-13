'use strict';

class seed {
    constructor(db){
    try {
        this.route2(db);
        this.chat(db);
        this.profile(db);}
    catch (e) { console.log(`error logged in seed file! : ${e}`);}
    }

    route2(db){
        let route2chat = [];
        for (let i = 0; i < 100; i++) {
            route2chat.push({
                name: `erguono ${i}`,
                content: `test chatting ${i}`
            });
        }
        db.Route2.bulkCreate(route2chat);
    }

    chat(db){
        let chatting = [];
        for (let i = 0; i < 100; i++){
            chatting.push({
                name: 'erguono',
                content: `test chatting ${i}`
            });
        }
        db.Chat.bulkCreate(chatting);
    }

    profile(db){
        let stack = [{ skill: 'HTML5', type: 'Front', description: '웹 마크업', mastery: 75 },{ skill: 'CSS3', type: 'Front', description: '웹 마크업 디자인', mastery: 70 }, { skill: 'Javascript', type: 'Front', description: '주요 활용 언어', mastery: 40 }, { skill: 'Node.js', type: 'Back', description: '비동기 이벤트 기반 런타임', mastery: 40 }, { skill: 'Angular.js', type: 'Front', description: '비동기 웹 프레임워크', mastery: 30 }];
        db.Profile.bulkCreate(stack);
    }
}

module.exports = (db) => new seed(db);
