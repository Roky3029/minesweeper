# Minesweeper

This is a simple but interesting minesweeper game. I suppose all of you know how to play this game, but just in case, I will explain in detail the rules of the game in this README.

### How to play?

Your main objective in Minesweeper is to clear the field of mines. There will be a number of mines distributed among the board, and you will have to deduce where they are in order to win. The game ends when you discover all the numbered tiles or place a flag on all the mines.

There are two types of tile, the mines and the numbered ones. The first one is quite straightforward. The second one consists of a set of possible numbers in the cells. The numbers may vary from 0 to 8, meaning the number of adjacent mines to the tile in the 3x3 square with center in the tile selected (minimum of 0 surrounding mines and a maximum of 8).

The game is programmed in a way that if you select an empty cell (with a 0, which, by the way, zeroes are not shown as a number), it will recursively reveal every adjacent cell, and the adjacents to these, in order to discover a chunk of empty (or numbered) cells.

#### About the programmer 🧑🏻

Hey! I'm Miguel, a Computer Engineering student, if you are considering contacting me, please write an email to mjibarb30@gmail.com, or, as an alternative, check my personal README on Github, where you'll find all the necessary information.

[Personal README](https://github.com/Roky3029/Roky3029)

> "Logic is the beginning of wisdom, not the end."
>
> > Leonard Nimoy
