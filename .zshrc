# ███████╗███████╗██╗  ██╗     ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ 
# ╚══███╔╝██╔════╝██║  ██║    ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ 
#   ███╔╝ ███████╗███████║    ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
#  ███╔╝  ╚════██║██╔══██║    ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
# ███████╗███████║██║  ██║    ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
# ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝ 
# thelazt16
# github.com/thelazt16
# Figlet font: ANSI Shadown, Calvin S, tmplr

# ╔╗ ╔═╗╔═╗╦╔═╗  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗╔═╗
# ╠╩╗╠═╣╚═╗║║    ║  ║ ║║║║╠╣ ║║ ╦╚═╗
# ╚═╝╩ ╩╚═╝╩╚═╝  ╚═╝╚═╝╝╚╝╚  ╩╚═╝╚═╝
ZSHDIR="$HOME/.config/zsh"
HISTSIZE=10000
SAVEHIST=10000

# ╔═╗╔═╗╦  ╦ ╦╔═╗  ╦╔╗╔╦╔╦╗
# ╔═╝╠═╝║  ║ ║║ ╦  ║║║║║ ║ 
# ╚═╝╩  ╩═╝╚═╝╚═╝  ╩╝╚╝╩ ╩ 
# install zplug if not installed then initialized
if [[ ! -d ~/.zplug ]]; then
    export ZPLUG_HOME=$HOME/.zplug
    git clone https://github.com/zplug/zplug $ZPLUG_HOME
    source ~/.zplug/init.zsh && zplug update
fi
source ~/.zplug/init.zsh

# ╦  ╦╔═╗╦═╗╦╔═╗╔╗ ╦  ╔═╗╔═╗
# ╚╗╔╝╠═╣╠╦╝║╠═╣╠╩╗║  ║╣ ╚═╗
#  ╚╝ ╩ ╩╩╚═╩╩ ╩╚═╝╩═╝╚═╝╚═╝
export EDITOR='code'
export BROWSER='firefox'
export HISTORY_IGNORE="(ls|cd|pwd|exit|sudo reboot|history|cd -|cd ..)"

# ╔╗ ╦╔╗╔╔═╗╦═╗╦╔═╗╔═╗
# ╠╩╗║║║║╠═╣╠╦╝║║╣ ╚═╗
# ╚═╝╩╝╚╝╩ ╩╩╚═╩╚═╝╚═╝
# Sourcing binaries to load to $PATH
if [ -d "$HOME/.local/bin" ] ;
    then PATH="$HOME/.local/bin:$PATH"
fi
if [ -d "$HOME/bin" ]; then
    PATH="$HOME/bin:$PATH"
fi
PATH=~/.console-ninja/.bin:$PATH
# ┓ ┏┳┳┓  ┏┓┏┓┏┓┏┓┳┏┓┳┏┓
# ┃┃┃┃┃┃  ┗┓┃┃┣ ┃ ┃┣ ┃┃ 
# ┗┻┛┛ ┗  ┗┛┣┛┗┛┗┛┻┻ ┻┗┛
# Load script specific to each wm
current_wm="$(wmctrl -m | awk -F': ' '/Name/ {print $2}')"
case "$current_wm" in
    Hyprland*)
        PATH="$HOME/.bin/hyprland:$HOME/.config/hypr/scripts:$PATH"
    ;;
    *)
        PATH="$HOME/.bin/$current_wm:$PATH"
    ;;
esac

# ╔═╗╔═╗╦ ╦  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
# ╔═╝╚═╗╠═╣  ║ ║╠═╝ ║ ║║ ║║║║╚═╗
# ╚═╝╚═╝╩ ╩  ╚═╝╩   ╩ ╩╚═╝╝╚╝╚═╝
# ZSH cool options to make your life easier
setopt AUTOCD              # change directory just by typing its name
setopt PROMPT_SUBST        # enable command substitution in prompt
setopt MENU_COMPLETE       # Automatically highlight first element of completion menu
setopt LIST_PACKED		   # The completion menu takes less space.
setopt AUTO_LIST           # Automatically list choices on ambiguous completion.
setopt HIST_IGNORE_DUPS	   # Do not write events to history that are duplicates of previous events
setopt HIST_FIND_NO_DUPS   # When searching history don't display results already cycled through twice
setopt COMPLETE_IN_WORD    # Complete from both ends of a word.

# ╦╔═╔═╗╦ ╦╔╗ ╦╔╗╔╔╦╗╦╔╗╔╔═╗╔═╗
# ╠╩╗║╣ ╚╦╝╠╩╗║║║║ ║║║║║║║ ╦╚═╗
# ╩ ╩╚═╝ ╩ ╚═╝╩╝╚╝═╩╝╩╝╚╝╚═╝╚═╝
# Bind HOME key to beginning-of-line
bindkey "\e[1~" beginning-of-line
bindkey "\e[H" beginning-of-line

# Bind END key to end-of-line
bindkey "\e[4~" end-of-line
bindkey "\e[F" end-of-line

# Bind PageUp key to scroll up
bindkey "\e[5~" history-beginning-search-backward

# Bind PageDown key to scroll down
bindkey "\e[6~" history-beginning-search-forward

# Bind Delete key to delete-char
bindkey "\e[3~" delete-char

# Define a function to add 'sudo ' to the beginning of the current command line
add_sudo() {
    if [[ $BUFFER == "sudo "* ]]; then
        BUFFER="${BUFFER#sudo }"
    else
        BUFFER="sudo $BUFFER"
    fi
    zle end-of-line  # Move cursor to the end of the line after adding 'sudo '
}
zle -N add_sudo  # Associate function with a zle widget

# Bind the grave key (`) to the add_sudo function when pressed twice
bindkey "\`\`" add_sudo


# ╔═╗╔═╗╦  ╦ ╦╔═╗  ╔═╗╦  ╦ ╦╔═╗╦╔╗╔╔═╗
# ╔═╝╠═╝║  ║ ║║ ╦  ╠═╝║  ║ ║║ ╦║║║║╚═╗
# ╚═╝╩  ╩═╝╚═╝╚═╝  ╩  ╩═╝╚═╝╚═╝╩╝╚╝╚═╝
zplug "zsh-users/zsh-syntax-highlighting"
zplug "zsh-users/zsh-history-substring-search"
zplug "zsh-users/zsh-autosuggestions"
zplug "zsh-users/zsh-completions"
zplug "lukechilds/zsh-nvm"
# zplug "changyuheng/fz", defer:1 # now using zoxide instead
# zplug "rupa/z", use:z.sh # now using zoxide instead

zplug "lib/completion", from:oh-my-zsh
zplug "lib/history", from:oh-my-zsh
zplug "plugins/colored-man-pages", from:oh-my-zsh
zplug "plugins/command-not-found", from:oh-my-zsh
zplug "plugins/git", from:oh-my-zsh
zplug "plugins/thefuck", from:oh-my-zsh
zplug "plugins/bgnotify", from:oh-my-zsh
zplug "plugins/zsh-interactive-cd", from:oh-my-zsh

#MichaelAquilina
zplug "MichaelAquilina/zsh-you-should-use"

source /usr/share/doc/find-the-command/ftc.zsh noprompt quiet

# ╔═╗╦  ╦╔═╗╔═╗╔═╗╔═╗
# ╠═╣║  ║╠═╣╚═╗║╣ ╚═╗
# ╩ ╩╩═╝╩╩ ╩╚═╝╚═╝╚═╝
source "$ZSHDIR/aliases.zsh"
source "$ZSHDIR/pacman.zsh"
source "$ZSHDIR/wireguard.zsh"

# ╔═╗╔╦╗╔╦╗
# ║  ║║║ ║║
# ╚═╝╩ ╩═╩╝

# source aliases.zsh so that any changes made will be applied right away
precmd() {
    source "$ZSHDIR/aliases.zsh"
}

# ╦╔╗╔╦╔╦╗╦╔═╗╦  ╦╔═╗╔═╗╔╦╗╦╔═╗╔╗╔
# ║║║║║ ║ ║╠═╣║  ║╔═╝╠═╣ ║ ║║ ║║║║
# ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝╩╚═╝╩ ╩ ╩ ╩╚═╝╝╚╝
# ┏┓┏┳┓┏┓┳┓┏┓┓┏┳┏┓
# ┗┓ ┃ ┣┫┣┫┗┓┣┫┃┃┃
# ┗┛ ┻ ┛┗┛┗┗┛┛┗┻┣┛
# Initiliaze startship first
eval "$(starship init zsh)"

# ┏┓┏┓┓ ┳┳┏┓
# ┏┛┃┃┃ ┃┃┃┓
# ┗┛┣┛┗┛┗┛┗┛
# Check for plugin and load zplug
if ! zplug check --verbose; then
    printf "Install? [y/N]: "
    if read -q; then
        echo; zplug install
    fi
    echo
fi
zplug load

# ┏┓┏┳┓┓┏┏┓┳┓┏┓
# ┃┃ ┃ ┣┫┣ ┣┫┗┓
# ┗┛ ┻ ┛┗┗┛┛┗┗┛
eval "$(zoxide init zsh)"
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
eval "$(atuin init zsh)"

# ┏┓┓┏┏┓  ┏┓┏┓┳┓┳┓┳┏┓┏┓
# ┣ ┗┫┣   ┃ ┣┫┃┃┃┃┃┣ ┗┓
# ┗┛┗┛┗┛  ┗┛┛┗┛┗┻┛┻┗┛┗┛
# Last but not least, UNLEASH the eye candies
$HOME/.local/bin/colorscript -r
fortune

