#!/bin/bash

check() {
    [ -f "/tmp/kittyinhibit.pid" ] && pgrep -x -F /tmp/kittyinhibit.pid
}

start() {
    status=$(check)
    if [[ ! $status ]]; then
        app_name="kittyinhibit"
        hyprctl keyword windowrulev2 "workspace 69 silent, class:^($app_name)$" > /dev/null
        hyprctl keyword windowrulev2 "idleinhibit always, class:^($app_name)$" > /dev/null
        kitty --class $app_name --title $app_name -e sleep 86400 &
        kitty_pid=$!
        echo "$kitty_pid" > /tmp/kittyinhibit.pid
        status=$(check)
        [[ $status ]] && echo 1
    else 
        echo 2
    fi
    return
}

stop() {
    status=$(check)
    if [[ $status ]]; then 
        kill "$status" 
        rm /tmp/kittyinhibit.pid
        status=$(check)
        [[ ! $status ]] && hyprctl keyword windowrulev2 "unset, class:^($app_name)$" > /dev/null && echo 1
    fi
    return
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

