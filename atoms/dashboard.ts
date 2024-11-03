import { atom } from "jotai";

export const upcomingEventsAtom = atom([]);
export const pendingInvitationsAtom = atom([]);
export const pastEventsAtom = atom([]);
export const dashboardStatsAtom = atom({
    upcomingCount: 0,
    pendingInvitationsCount: 0,
    allergiesCount: 0,
    pastEventsCount: 0,
});
