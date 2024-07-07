#!/bin/bash

if [ ! -f ~/.config/hypr/.initial_startup_done ]; then
  kvantum_theme="catppuccin-mocha-mauve"
  color_scheme="prefer-dark"
  gtk_theme="Lavanda-Dark-Compact-Tokyonight"
  icon_theme="Papirus-Dark"
  cursor_theme="Fluent-dark"

  # initiate GTK dark mode and apply icon and cursor theme
  gsettings set org.gnome.desktop.interface color-scheme $color_scheme > /dev/null 2>&1 &
  gsettings set org.gnome.desktop.interface gtk-theme $gtk_theme > /dev/null 2>&1 &
  gsettings set org.gnome.desktop.interface icon-theme $icon_theme > /dev/null 2>&1 &
  gsettings set org.gnome.desktop.interface cursor-theme $cursor_theme > /dev/null 2>&1 &
  gsettings set org.gnome.desktop.interface cursor-size 24 > /dev/null 2>&1 &

  # initiate kvantum theme
  kvantummanager --set "$kvantum_theme" > /dev/null 2>&1 &
  # Create a marker file to indicate that the script has been executed.
  touch ~/.config/hypr/.initial_startup_done
fi