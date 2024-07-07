#!/bin/bash

# Polkit
/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
# /usr/lib/polkit-kde-authentication-agent-1

# Startup
dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP &
systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP &

# Start the gnome-keyring daemon, so something like bitwarden extension/addon won't ask you for master password each time you login
/usr/bin/gnome-keyring-daemon --start --components=secrets,ssh,gpg,pcks11 &
export GNOME_KEYRING_CONTROL=/run/user/1000/keyring
export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK

# Kwallet 
#/usr/bin/kwalletd5 &
