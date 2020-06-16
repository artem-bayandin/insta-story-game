# 'Survive' - my game for Instagram

My first attempt to build a game for Instagram. For this purpose I've decided to port Wolf and Eggs by Nintendo, with some minor changes to make it as simple as possible.

Try this effect in Instagram: https://www.instagram.com/ar/545255333029046/

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

### Total time spent for v1.2 : 79h (June 16, 2020)
