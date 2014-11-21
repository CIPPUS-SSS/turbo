#!/bin/bash
#get current workspace
MYAPP_WRAPPER="`readlink -f "$0"`"
HERE="`dirname "$MYAPP_WRAPPER"`"
#link the lib to current directory
paths=(
"/lib/x86_64-linux-gnu/libudev.so.1" # Ubuntu, Xubuntu, Mint
"/usr/lib64/libudev.so.1" # SUSE, Fedora
"/usr/lib/libudev.so.1" # Arch, Fedora 32bit
"/lib/i386-linux-gnu/libudev.so.1" # Ubuntu 32bit
)
for i in "${paths[@]}"
do
	if [ -f $i ]
	then
		ln -sf "$i" $HERE/libudev.so.0
		break
	fi
done
