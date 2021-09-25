"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetRankingsByPeriod = exports.RankingPeriods = void 0;
const admin = require("firebase-admin");
const email_1 = require("../../email");
const achievements_1 = require("./achievements");
var RankingPeriods;
(function (RankingPeriods) {
    RankingPeriods["daily"] = "daily";
    RankingPeriods["weekly"] = "weekly";
    RankingPeriods["monthly"] = "monthly";
    RankingPeriods["quarterly"] = "quarterly";
})(RankingPeriods = exports.RankingPeriods || (exports.RankingPeriods = {}));
const getTopUsers = async (period) => {
    const ref = await admin.database().ref('profiles')
        .orderByChild(`rankings/${period}`)
        .startAt(1)
        .once('value');
    const users = [];
    ref.forEach((child) => {
        var _a, _b, _c, _d;
        const user = child.val();
        const { email, name } = user.bio;
        const fullName = (_b = (_a = name === null || name === void 0 ? void 0 : name.first) !== null && _a !== void 0 ? _a : 'Anon' + ' ' + (name === null || name === void 0 ? void 0 : name.last)) !== null && _b !== void 0 ? _b : 'Ymous';
        const coins = (_d = (_c = user.rankings) === null || _c === void 0 ? void 0 : _c[period]) !== null && _d !== void 0 ? _d : 0;
        users.push({
            email, coins,
            fullName,
            id: child.key
        });
    });
    users.sort((a, b) => b.coins - a.coins);
    return users;
};
const saveTopUsers = async (period, users) => {
    await admin.database().ref('rankings')
        .child(period)
        .set(users);
};
const resetRankings = async (userPaths) => {
    const data = userPaths.reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
    }, {});
    await admin.database().ref('profiles').update(data);
};
const resetRankingsByPeriod = async (period) => {
    const topUsers = await getTopUsers(period);
    const top5users = topUsers.slice(0, 5);
    await saveTopUsers(period, top5users);
    if (top5users.length > 0)
        await email_1.sendTopUsersEmail(period, top5users);
    const userIds = topUsers.map((user) => user.id);
    const paths = userIds.map((userId) => `${userId}/rankings/${period}`);
    await resetRankings(paths);
    if (period === RankingPeriods.daily)
        await Promise.all(topUsers.map(async (user, index) => await achievements_1.Achievement.checkDailyFinishAchievement(user.id, index + 1)));
    if (period === RankingPeriods.weekly)
        await Promise.all(topUsers.map(async (user, index) => await achievements_1.Achievement.checkWeeklyFinishAchievement(user.id, index + 1)));
};
exports.resetRankingsByPeriod = resetRankingsByPeriod;
//# sourceMappingURL=rankings.js.map