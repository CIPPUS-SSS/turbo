#!/bin/bash
#get current workspace
MYAPP_WRAPPER="`readlink -f "$0"`"
HERE="`dirname "$MYAPP_WRAPPER"`"

# Always use our versions of ffmpeg libs.
# This also makes RPMs find our library symlinks.
# if LD_LIBRARY_PATH is not zero length add it to LD_LIBRARY_PATH else export to $HERE:$HERE/lib
export LD_LIBRARY_PATH=$([ -n "$LD_LIBRARY_PATH" ] && echo "$HERE:$HERE/lib:$LD_LIBRARY_PATH" || echo "$HERE:$HERE/lib")
echo $LD_LIBRARY_PATH
# $@ all arguments $0 is $HERE/run
exec -a "$0" "$HERE/run.sh"  "$@"
