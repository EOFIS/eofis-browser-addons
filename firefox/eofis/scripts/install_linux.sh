#!/bin/sh
mkdir ~/.mozilla/native-messaging-hosts -p
# Have to get full path for source file hence readlink
ln -s $(readlink -f ./app/eofis.json) ~/.mozilla/native-messaging-hosts/
