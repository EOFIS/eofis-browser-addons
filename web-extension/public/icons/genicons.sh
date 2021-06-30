#!/bin/sh
for i in 16 19 32 38 48 96 128;
do inkscape logo.svg -w $i -h $i -o $i.png;
done
