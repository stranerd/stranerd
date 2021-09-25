"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRank = void 0;
const admin = require("firebase-admin");
const notifications_1 = require("./notifications");
var RankTypes;
(function (RankTypes) {
    RankTypes["Rookie"] = "Rookie";
    RankTypes["Comrade"] = "Comrade";
    RankTypes["Scholar"] = "Scholar";
    RankTypes["Einstein"] = "Einstein";
})(RankTypes || (RankTypes = {}));
const SCORES = {
    HOST_SESSION: 2,
    BEST_ANSWER: 1,
    ANSWER_QUESTION: 0.75,
    ATTEND_SESSION: 0.625,
    ASK_QUESTION: 0.375,
    DAILY_LOGIN: 0.1,
    PURCHASE_GOLD: 0.0025,
    PURCHASE_BRONZE: 0.000125
};
const Ranks = {
    [RankTypes.Rookie]: {
        id: RankTypes.Rookie,
        level: 1,
        hostSession: 0,
        attendSession: 7,
        askQuestion: 15,
        answerQuestion: 15,
        bestAnswer: 0,
        dailyLogin: 30,
        score: 0,
        ratings: 0
    },
    [RankTypes.Comrade]: {
        id: RankTypes.Comrade,
        level: 2,
        hostSession: 0,
        attendSession: 14,
        askQuestion: 30,
        answerQuestion: 30,
        bestAnswer: 10,
        dailyLogin: 60,
        score: 75,
        ratings: 3.5
    },
    [RankTypes.Scholar]: {
        id: RankTypes.Scholar,
        level: 3,
        hostSession: 60,
        attendSession: 0,
        askQuestion: 50,
        answerQuestion: 50,
        bestAnswer: 20,
        dailyLogin: 90,
        score: 250,
        ratings: 4
    },
    [RankTypes.Einstein]: {
        id: RankTypes.Comrade,
        level: 4,
        hostSession: 100,
        attendSession: 0,
        askQuestion: 0,
        answerQuestion: 0,
        bestAnswer: 30,
        dailyLogin: 100,
        score: 400,
        ratings: 4
    }
};
const ranks = Object.values(Ranks).sort((a, b) => a.level - b.level);
const getScore = (account) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    let score = 0;
    score += Object.keys((_b = (_a = account === null || account === void 0 ? void 0 : account.meta) === null || _a === void 0 ? void 0 : _a.tutorSessions) !== null && _b !== void 0 ? _b : {}).length * SCORES.HOST_SESSION;
    score += Object.keys((_d = (_c = account === null || account === void 0 ? void 0 : account.meta) === null || _c === void 0 ? void 0 : _c.bestAnswers) !== null && _d !== void 0 ? _d : {}).length * SCORES.BEST_ANSWER;
    score += Object.keys((_f = (_e = account === null || account === void 0 ? void 0 : account.meta) === null || _e === void 0 ? void 0 : _e.answers) !== null && _f !== void 0 ? _f : {}).length * SCORES.ANSWER_QUESTION;
    score += Object.keys((_h = (_g = account === null || account === void 0 ? void 0 : account.meta) === null || _g === void 0 ? void 0 : _g.sessions) !== null && _h !== void 0 ? _h : {}).length * SCORES.ATTEND_SESSION;
    score += Object.keys((_k = (_j = account === null || account === void 0 ? void 0 : account.meta) === null || _j === void 0 ? void 0 : _j.questions) !== null && _k !== void 0 ? _k : {}).length * SCORES.ASK_QUESTION;
    score += ((_m = (_l = account === null || account === void 0 ? void 0 : account.streak) === null || _l === void 0 ? void 0 : _l.longestStreak) !== null && _m !== void 0 ? _m : 0) * SCORES.DAILY_LOGIN;
    score += ((_p = (_o = account === null || account === void 0 ? void 0 : account.bought) === null || _o === void 0 ? void 0 : _o.gold) !== null && _p !== void 0 ? _p : 0) * SCORES.PURCHASE_GOLD;
    score += ((_r = (_q = account === null || account === void 0 ? void 0 : account.bought) === null || _q === void 0 ? void 0 : _q.bronze) !== null && _r !== void 0 ? _r : 0) * SCORES.PURCHASE_BRONZE;
    return score;
};
const getRating = (account) => {
    var _a;
    const { total = 0, count = 0 } = (_a = account === null || account === void 0 ? void 0 : account.ratings) !== null && _a !== void 0 ? _a : {};
    return count === 0 ? 0 : total / count;
};
const getLastRank = (rank) => {
    var _a;
    const index = ranks.findIndex((r) => r.id === rank);
    return (_a = ranks[index - 1]) !== null && _a !== void 0 ? _a : Ranks[RankTypes.Rookie];
};
const getNextRank = (rank) => {
    var _a;
    const index = ranks.findIndex((r) => r.id === rank);
    return (_a = ranks[index + 1]) !== null && _a !== void 0 ? _a : null;
};
const checkRank = async (userId) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const accountRef = admin.database().ref('profiles').child(userId).child('account');
    const account = (_a = (await accountRef.once('value')).val()) !== null && _a !== void 0 ? _a : {};
    const rank = (_b = ranks.find((r) => r.level === (account === null || account === void 0 ? void 0 : account.rank))) !== null && _b !== void 0 ? _b : Ranks.Rookie;
    const hostedSessions = Object.keys((_d = (_c = account === null || account === void 0 ? void 0 : account.meta) === null || _c === void 0 ? void 0 : _c.tutorSessions) !== null && _d !== void 0 ? _d : {}).length;
    const attendedSessions = Object.keys((_f = (_e = account === null || account === void 0 ? void 0 : account.meta) === null || _e === void 0 ? void 0 : _e.completedSessions) !== null && _f !== void 0 ? _f : {}).length;
    const questions = Object.keys((_h = (_g = account === null || account === void 0 ? void 0 : account.meta) === null || _g === void 0 ? void 0 : _g.questions) !== null && _h !== void 0 ? _h : {}).length;
    const answers = Object.keys((_k = (_j = account === null || account === void 0 ? void 0 : account.meta) === null || _j === void 0 ? void 0 : _j.answers) !== null && _k !== void 0 ? _k : {}).length;
    const bestAnswers = Object.keys((_m = (_l = account === null || account === void 0 ? void 0 : account.meta) === null || _l === void 0 ? void 0 : _l.bestAnswers) !== null && _m !== void 0 ? _m : {}).length;
    const dailyLogin = (_p = (_o = account === null || account === void 0 ? void 0 : account.streak) === null || _o === void 0 ? void 0 : _o.longestStreak) !== null && _p !== void 0 ? _p : 0;
    const score = getScore(account);
    const ratings = getRating(account);
    const lastRank = getLastRank(rank.id);
    if (ratings < (lastRank.ratings - 0.5)) {
        await accountRef.child('rank').set(lastRank.level);
        await notifications_1.createNotification(userId, {
            body: `You just got demoted to ${lastRank.id}`,
            action: '/account/'
        });
    }
    else if (ratings < lastRank.ratings) {
        await notifications_1.createNotification(userId, {
            body: `Watch it! If your ratings go below ${Math.abs(lastRank.ratings - 0.5)}, you will get demoted to ${lastRank.id}`,
            action: '/account/'
        });
    }
    else {
        const next = hostedSessions >= rank.hostSession &&
            attendedSessions >= rank.attendSession &&
            questions >= rank.askQuestion &&
            answers >= rank.answerQuestion &&
            bestAnswers >= rank.bestAnswer &&
            dailyLogin >= rank.dailyLogin &&
            score >= rank.score &&
            ratings >= rank.ratings;
        const nextRank = getNextRank(rank.id);
        if (next && nextRank) {
            await accountRef.child('rank').set(nextRank.level);
            await notifications_1.createNotification(userId, {
                body: `You just got promoted to ${nextRank.id}`,
                action: '/account/'
            });
        }
    }
};
exports.checkRank = checkRank;
//# sourceMappingURL=ranks.js.map