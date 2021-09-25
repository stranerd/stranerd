"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTutorReview = exports.addTutorRatings = void 0;
const admin = require("firebase-admin");
const addTutorRatings = async (userId, ratings) => {
    if (ratings > 5)
        ratings = 5;
    if (ratings < 0)
        ratings = 0;
    await admin.database().ref('profiles')
        .child(userId)
        .child('account/ratings')
        .update({
        total: admin.database.ServerValue.increment(ratings),
        count: admin.database.ServerValue.increment(1)
    });
};
exports.addTutorRatings = addTutorRatings;
const addTutorReview = async (userId, authId, review, rating) => {
    if (!review)
        return;
    if (rating > 5)
        rating = 5;
    if (rating < 0)
        rating = 0;
    const bioRef = await admin.database().ref(`profiles/${authId}/bio`).once('value');
    const bio = bioRef.val();
    const data = {
        review, rating,
        userId: authId, userBio: bio,
        dates: { createdAt: Date.now() }
    };
    await admin.database().ref('users')
        .child(userId)
        .child('reviews')
        .push(data);
};
exports.addTutorReview = addTutorReview;
//# sourceMappingURL=tutors.js.map