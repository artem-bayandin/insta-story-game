# 'Survive' - my game for Instagram

My first attempt to build a game for Instagram. For this purpose I've decided to port Wolf and Eggs by Nintendo, with some minor changes to make it as simple as possible.

## [Gameplay]

a. Turn you head left or right to move Player icon

b. Avoid 'killers' and collect 'healers'

c. Choose game mode using UI picker

d. Tap 'record' to play

e. Try to survive as long as possible

## [Limitations]

a. I do not track a position of your head, but I'd subscribed to events like 'head turned left' and 'head turned right'. This adds some delay before Player icon moves. This was done because I had to control Player icon from code, and there's no possibility to control it both from code and patch editor. That's why it has a lag currently.

b. Some limitations with FPS. For unknown reasons, FPS depends on the light (and for even more unclear reasons, it's faster when you have a sun behind you, not in front of). With that said, a default app without anything added to it (just an empty one) has the same FPS. So, my game has good FPS.

c. Before I got to that, I have updated the logic, and added 'caching' and 'memoising' mechanisms, so that nothing is calculated twice, plus when possible, I do a short-circuit (terminate updates), if newValue equals to prevValue.

d. Time to play is limited to 55 seconds. This was done because I wished a user to tap 'record' button and Instagram has a limit of 60 seconds to record a video. That's why my game should stop and show stats screen for at least few seconds before recording finishes.

e. Game is coded in a way that you may easily configure different settings, including textures for icons, probability of each 'egg', speed, lives, and so on. And my 'modes' do work this way currently, these are not just texture changes, but all the settings too (although, all the settings are the same).

## [Time Logs]

On May, 28th I've decided to know how much time I've spent on this code, so have written down all the commit times (you will find it below). It is needed just to know past time, for my next commits I will log start/end time manually every day.
As for the stats below, these are separated by periods, plus I've added 30 min to each (I do not commit at the time when I've just opened my notebook, so let's say, I used to spend about half an hour befor first commit in a row).

### Sent for approval on June 6, 2020. Total time spent : 71.25 hours

### Total time spent before May, 30th, 7:20PM : 47.75 hours

Additional time from the previous milestone: 12.75h

### Total time spent before May, 28th, 1:30AM : 35 hours (including 13x0.5h)

13 10:58
14 0:40
14 0:56
= 2h + 0.5h

14 10:55
14 11:28
14 11:49
15 0:34
15 1:02
15 1:24
15 1:39
= 2.75h + 0.5h

19 0:06
19 0:18
19 0:47
19 0:52
= 0.75h + 0.5h

19 10:35
19 10:50
20 0:03
20 0:52
= 2.25h + 0.5h

21 0:46
21 1:18
21 2:10
21 2:30
= 1.75h + 0.5h

21 6:32
21 6:43
21 8:11
21 8:37
21 8:55
= 2.5h + 0.5h

23 11:37
24 0:37
24 1:15
24 1:38
24 2:03
= 2.5h + 0.5h

24 11:27
24 11:50
24 11:57
24 0:12
24 0:18
24 0:28
24 0:50
24 1:14
= 2h + 0.5h

24 7:09
24 7:18
24 7:20
24 7:31
24 8:33
24 9:20
24 9:48
24 9:49
= 2.75h + 0.5h

24 11:22
24 11:38
24 11:54
25 0:09
25 0:54
= 1.5h + 0.5h

25 11:27
25 11:34
25 11:40
25 11:45
26 0:15
26 0:25
26 0:34
26 0:38
= 1.25h + 0.5h

26 9:52
26 11:04
26 11:39
27 1:26
= 3.5h + 0.5h

27 8:59
27 9:50
(here was a 1 hour break)
27 11:40
28 0:03
28 0:10
28 0:19
28 0:24
28 0:31
28 0:35
28 0:41
28 1:04
= 3h + 0.5h
