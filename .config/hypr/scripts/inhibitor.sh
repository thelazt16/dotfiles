#!/bin/bash

check() {
    [ -f "/tmp/kittyinhibit.pid" ] && pgrep -x -F /tmp/kittyinhibit.pid
}

start() {
    status=$(check)
    if [[ ! $status ]]; then
        kitty --class kittyinhibit --title kittyinhibit -e sleep 86400 &
        kitty_pid=$!
        echo "$kitty_pid" > /tmp/kittyinhibit.pid
        status=$(check)
        [[ $status ]] && echo 1
    else 
        echo 2
    fi
}

stop() {
    status=$(check)
    if [[ $status ]]; then 
        kill "$status" 
        rm /tmp/kittyinhibit.pid
        status=$(check)
        [[ ! $status ]] && echo 1
    fi
}

# Parse command-line arguments
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    check)
        check
        ;;
    *)
        echo "Usage: $0 {start|stop|check}"
        exit 1
        ;;
esac

exit 0

