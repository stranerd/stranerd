"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Achievement = void 0;
const admin = require("firebase-admin");
const transactions_1 = require("../payments/transactions");
const notifications_1 = require("./notifications");
const Achievements = {
    ASK_QUESTIONS: {
        id: 'ASK_QUESTIONS',
        name: 'Scholar',
        description: 'Ask 100 questions',
        limit: 100,
        price: {
            bronze: 40,
            xp: 50
        }
    },
    STREAK_7_DAYS: {
        id: 'STREAK_7_DAYS',
        name: '7 Day Streak',
        description: 'Complete a 7 day streak',
        limit: 7,
        price: {
            bronze: 35,
            xp: 25
        }
    },
    BUY_GOLD: {
        id: 'BUY_GOLD',
        name: 'Deep Pockets',
        description: 'Buy 100 gold coins',
        limit: 100,
        price: {
            bronze: 20,
            xp: 100
        }
    },
    BUY_BRONZE: {
        id: 'BUY_BRONZE',
        name: 'Entrepreneur',
        description: 'Buy 100 bronze coins',
        limit: 100,
        price: {
            bronze: 20,
            xp: 50
        }
    },
    ATTEND_SESSIONS: {
        id: 'ATTEND_SESSIONS',
        name: 'Nerd Indeed',
        description: 'Attend 25 sessions',
        limit: 25,
        price: {
            bronze: 25,
            xp: 100
        }
    },
    TIP_NERDS: {
        id: 'TIP_NERDS',
        name: 'Cheerful Giver',
        description: 'Tip nerds 15 times',
        limit: 15,
        price: {
            bronze: 50,
            xp: 50
        }
    },
    DAILY_FINISH: {
        id: 'DAILY_FINISH',
        name: 'Legendary',
        description: 'Finish #1 in daily rankings',
        limit: 1,
        price: {
            bronze: 5,
            xp: 50
        }
    },
    WEEKLY_FINISH: {
        id: 'WEEKLY_FINISH',
        name: 'Weekend Warrior',
        description: 'Finish #1 in weekly rankings',
        limit: 1,
        price: {
            bronze: 25,
            xp: 100
        }
    }
};
const getAchievementProgress = async (userId, id) => {
    var _a;
    const ref = admin.database().ref('profiles')
        .child(userId)
        .child('achievements')
        .child(id);
    const data = await ref.once('value');
    const { progress = 0, completed = false } = (_a = data.val()) !== null && _a !== void 0 ? _a : {};
    return { progress, completed, ref };
};
const sendNotification = async (userId, achievement) => {
    await notifications_1.createNotification(userId, {
        body: `Congratulations, you just gained progress for the achievement: ${achievement.name}`,
        action: '/account'
    });
};
const runAfterAchievement = async (userId, achievement) => {
    const { name, price: { bronze, xp } } = achievement;
    await transactions_1.addUserXp(userId, xp);
    await transactions_1.addUserCoins(userId, { bronze, gold: 0 }, `You earned coins for completing the achievement: ${name}`);
};
const checkAskQuestionsAchievement = async (userId) => {
    const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.ASK_QUESTIONS.id);
    if (!completed && progress + 1 >= Achievements.ASK_QUESTIONS.limit) {
        await ref.update({ completed: true, progress: admin.database.ServerValue.increment(1) });
        await runAfterAchievement(userId, Achievements.ASK_QUESTIONS);
    }
    else if (!completed) {
        await ref.update({ progress: admin.database.ServerValue.increment(1) });
        await sendNotification(userId, Achievements.ASK_QUESTIONS);
    }
};
const checkStreak7Day = async (userId, streak) => {
    const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.STREAK_7_DAYS.id);
    if (!completed) {
        if (streak >= Achievements.STREAK_7_DAYS.limit && streak >= progress) {
            await ref.update({ completed: true, progress: streak });
            await runAfterAchievement(userId, Achievements.STREAK_7_DAYS);
        }
        else {
            await ref.update({ progress: streak });
            await sendNotification(userId, Achievements.STREAK_7_DAYS);
        }
    }
};
const checkBuyGoldAchievement = async (userId, coins) => {
    const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.BUY_GOLD.id);
    if (!completed && progress + coins >= Achievements.BUY_GOLD.limit) {
        await ref.update({ completed: true, progress: admin.database.ServerValue.increment(coins) });
        await runAfterAchievement(userId, Achievements.BUY_GOLD);
    }
    else if (!completed) {
        await ref.update({ progress: admin.database.ServerValue.increment(coins) });
        await sendNotification(userId, Achievements.BUY_GOLD);
    }
};
const checkBuyBronzeAchievement = async (userId, coins) => {
    const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.BUY_BRONZE.id);
    if (!completed && progress + coins >= Achievements.BUY_BRONZE.limit) {
        await ref.update({ completed: true, progress: admin.database.ServerValue.increment(coins) });
        await runAfterAchievement(userId, Achievements.BUY_BRONZE);
    }
    else if (!completed) {
        await ref.update({ progress: admin.database.ServerValue.increment(coins) });
        await sendNotification(userId, Achievements.BUY_BRONZE);
    }
};
const checkAttendSessionsAchievement = async (userId) => {
    const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.ATTEND_SESSIONS.id);
    if (!completed && progress + 1 >= Achievements.ATTEND_SESSIONS.limit) {
        await ref.update({ completed: true, progress: admin.database.ServerValue.increment(1) });
        await runAfterAchievement(userId, Achievements.ATTEND_SESSIONS);
    }
    else if (!completed) {
        await ref.update({ progress: admin.database.ServerValue.increment(1) });
        await sendNotification(userId, Achievements.ATTEND_SESSIONS);
    }
};
const checkTipTutorsAchievement = async (userId) => {
    const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.TIP_NERDS.id);
    if (!completed && progress + 1 >= Achievements.TIP_NERDS.limit) {
        await ref.update({ completed: true, progress: admin.database.ServerValue.increment(1) });
        await runAfterAchievement(userId, Achievements.TIP_NERDS);
    }
    else if (!completed) {
        await ref.update({ progress: admin.database.ServerValue.increment(1) });
        await sendNotification(userId, Achievements.TIP_NERDS);
    }
};
const checkDailyFinishAchievement = async (userId, rank) => {
    const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.DAILY_FINISH.id);
    const oldRank = progress === 0 ? Infinity : progress;
    if (!completed && rank < oldRank) {
        if (rank <= Achievements.DAILY_FINISH.limit) {
            await ref.update({ completed: true, progress: rank });
            await runAfterAchievement(userId, Achievements.DAILY_FINISH);
        }
        else {
            await ref.update({ progress: rank });
            await sendNotification(userId, Achievements.DAILY_FINISH);
        }
    }
};
const checkWeeklyFinishAchievement = async (userId, rank) => {
    const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.WEEKLY_FINISH.id);
    const oldRank = progress === 0 ? Infinity : progress;
    if (!completed && rank < oldRank) {
        if (rank <= Achievements.WEEKLY_FINISH.limit) {
            await ref.update({ completed: true, progress: rank });
            await runAfterAchievement(userId, Achievements.WEEKLY_FINISH);
        }
        else {
            await ref.update({ progress: rank });
            await sendNotification(userId, Achievements.WEEKLY_FINISH);
        }
    }
};
exports.Achievement = {
    checkAskQuestionsAchievement,
    checkStreak7Day,
    checkBuyGoldAchievement,
    checkBuyBronzeAchievement,
    checkAttendSessionsAchievement,
    checkTipTutorsAchievement,
    checkDailyFinishAchievement,
    checkWeeklyFinishAchievement
};
//# sourceMappingURL=achievements.js.map