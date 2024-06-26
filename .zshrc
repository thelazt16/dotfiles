# ███████╗███████╗██╗  ██╗     ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ 
# ╚══███╔╝██╔════╝██║  ██║    ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ 
#   ███╔╝ ███████╗███████║    ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
#  ███╔╝  ╚════██║██╔══██║    ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
# ███████╗███████║██║  ██║    ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
# ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝ 
# thelazt16
# github.com/thelazt16
# Figlet font: ANSI Shadow, Calvin S, tmplr

# Tested out same config with omz, zinit, and zplug
# OMZ > ZINIT > ZPLUG
# OMZ came out on top at ~250ms, zinit ~500ms, zplug ~270ms
# Using zinit ice (turbo mode) on all plugin, zinit could reach ~225ms
# Although with ice the plugin isn't activated at prompt creation but at the next cmd
# Which means, if you ice completions, it won't activate until next cmd
# With 3 essential plugin from zsh-user, zinit ice load at ~250ms

# For checking how fast the prompt open
# start_time=$(date +%s%3N)
# zmodload zsh/zprof


# ╔═╗╔╦╗╔═╗  ╔═╗╔═╗╔╦╗╦ ╦╔═╗
# ║ ║║║║╔═╝  ╚═╗║╣  ║ ║ ║╠═╝
# ╚═╝╩ ╩╚═╝  ╚═╝╚═╝ ╩ ╚═╝╩
# check if oh-my-zsh is installed, otherwise install it.
export ZSH="$HOME/.oh-my-zsh"
if [[ ! -d ~/.oh-my-zsh ]]; then
    echo "oh-my-zsh not installed."
    OMZ_CUSPLUG="$HOME/.oh-my-zsh/custom/plugins"
    git clone https://github.com/ohmyzsh/ohmyzsh.git $ZSH
    git clone https://github.com/zsh-users/zsh-autosuggestions $OMZ_CUSPLUG/zsh-autosuggestions
    git clone https://github.com/zsh-users/zsh-completions $OMZ_CUSPLUG/zsh-completions
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $OMZ_CUSPLUG/zsh-syntax-highlighting
    git clone git@github.com:Aloxaf/fzf-tab.git $OMZ_CUSPLUG/fzf-tab
    git clone https://github.com/MichaelAquilina/zsh-you-should-use.git $OMZ_CUSPLUG/zsh-you-should-use
    clear
fi

# ╔═╗╔╦╗╔═╗  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗╦ ╦╦═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
# ║ ║║║║╔═╝  ║  ║ ║║║║╠╣ ║║ ╦║ ║╠╦╝╠═╣ ║ ║║ ║║║║╚═╗
# ╚═╝╩ ╩╚═╝  ╚═╝╚═╝╝╚╝╚  ╩╚═╝╚═╝╩╚═╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
plugins=(
    bgnotify
    colored-man-pages
    fzf-tab
    git
    nvm
    thefuck
    zsh-autosuggestions
    zsh-completions
    zsh-syntax-highlighting
    zsh-you-should-use
)
zstyle ':omz:update' mode auto
zstyle ':omz:update' frequency 7

zstyle ':omz:plugins:nvm' lazy yes
zstyle ':omz:plugins:colored-man-pages' lazy yes
zstyle ':omz:plugins:git' lazy yes
zstyle ':omz:plugins:bgnotify' lazy yes
zstyle ':omz:plugins:thefuck' lazy yes

# ╔╗ ╔═╗╔═╗╦╔═╗  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗╔═╗
# ╠╩╗╠═╣╚═╗║║    ║  ║ ║║║║╠╣ ║║ ╦╚═╗
# ╚═╝╩ ╩╚═╝╩╚═╝  ╚═╝╚═╝╝╚╝╚  ╩╚═╝╚═╝
ZSHDIR="$HOME/.config/zsh"
HISTSIZE=10000
SAVEHIST=$HISTSIZE
HISTDUP=erase

# ╦  ╦╔═╗╦═╗╦╔═╗╔╗ ╦  ╔═╗╔═╗
# ╚╗╔╝╠═╣╠╦╝║╠═╣╠╩╗║  ║╣ ╚═╗
#  ╚╝ ╩ ╩╩╚═╩╩ ╩╚═╝╩═╝╚═╝╚═╝
export EDITOR='code'
export BROWSER='firefox'
export HISTORY_IGNORE="(ls|cd|pwd|exit|sudo reboot|history|cd -|cd ..)"

# ╔═╗╔═╗╦ ╦  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
# ╔═╝╚═╗╠═╣  ║ ║╠═╝ ║ ║║ ║║║║╚═╗
# ╚═╝╚═╝╩ ╩  ╚═╝╩   ╩ ╩╚═╝╝╚╝╚═╝
# ZSH cool options to make your life easier
setopt APPENDHISTORY        # Append event instead of overwriting 
setopt AUTOCD               # change directory just by typing its name
setopt AUTO_LIST            # Automatically list choices on ambiguous completion.
setopt COMPLETE_IN_WORD     # Complete from both ends of a word.
setopt HIST_FIND_NO_DUPS    # When searching history don't display results already cycled through twice
setopt HIST_IGNORE_ALL_DUPS	# Do not write events to history that are duplicates of previous events
setopt HIST_IGNORE_DUPS	    # Do not write events to history that are duplicates of previous events
setopt HIST_IGNORE_SPACE    # Do not write events to history that are started with space
setopt HIST_SAVE_NO_DUPS	# Do not save events to history that are duplicates of previous events
setopt LIST_PACKED		    # The completion menu takes less space.
setopt MENU_COMPLETE        # Automatically highlight first element of completion menu
setopt PROMPT_SUBST         # enable command substitution in prompt
setopt SHAREHISTORY         # share history to other prompt right away not at launch

# Completion styling
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle ':completion:*' menu no
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'ls --color $realpath'
zstyle ':fzf-tab:complete:__zoxide_z:*' fzf-preview 'ls --color $realpath'

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
    [[ $BUFFER == "sudo "* ]] && BUFFER="${BUFFER#sudo }" || BUFFER="sudo $BUFFER"
    zle end-of-line  # Move cursor to the end of the line after adding 'sudo '
}
zle -N add_sudo  # Associate function with a zle widget

# Bind the grave key (`) to the add_sudo function when pressed twice
bindkey "\`\`" add_sudo

# ╔╗ ╦╔╗╔╔═╗╦═╗╦╔═╗╔═╗
# ╠╩╗║║║║╠═╣╠╦╝║║╣ ╚═╗
# ╚═╝╩╝╚╝╩ ╩╩╚═╩╚═╝╚═╝
# Sourcing binary directories to load to $PATH
[ -d "$HOME/.local/bin" ] && PATH="$HOME/.local/bin:$PATH"
[ -d "$HOME/bin" ] && PATH="$HOME/bin:$PATH"

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

# ╔═╗╦  ╦╔═╗╔═╗╔═╗╔═╗
# ╠═╣║  ║╠═╣╚═╗║╣ ╚═╗
# ╩ ╩╩═╝╩╩ ╩╚═╝╚═╝╚═╝
source "$ZSHDIR/aliases.zsh"
# check if wireguard is installed, then source the aliases
which wg > /dev/null 2>&1 && source "$ZSHDIR/wireguard.zsh"
# check if pacman is installed, then source the aliases
which pacman > /dev/null 2>&1 && source "$ZSHDIR/pacman.zsh"

# ╔═╗╔╦╗╔╦╗
# ║  ║║║ ║║
# ╚═╝╩ ╩═╩╝
# source aliases.zsh so that any changes made will be applied on enter
precmd() {
    source "$ZSHDIR/aliases.zsh"
}

# ╦╔╗╔╦╔╦╗╔═╗
# ║║║║║ ║ ╚═╗
# ╩╝╚╝╩ ╩ ╚═╝
eval "$(starship init zsh)"
# eval "$(oh-my-posh init zsh --config $HOME/.config/ohmyposh/ohmyposh.toml)"
source $ZSH/oh-my-zsh.sh
eval "$(zoxide init zsh)"
eval "$(fzf --zsh)"
eval "$(atuin init zsh)"

# ┏┓┓┏┏┓  ┏┓┏┓┳┓┳┓┳┏┓┏┓
# ┣ ┗┫┣   ┃ ┣┫┃┃┃┃┃┣ ┗┓
# ┗┛┗┛┗┛  ┗┛┛┗┛┗┻┛┻┗┛┗┛
# Last but not least, UNLEASH the eye candies
$HOME/bin/colorscript -r
fortune

# Check how fast the prompt open
# end_time=$(date +%s%3N)
# elapsed=$((end_time - start_time))
# echo "Zsh startup time: ${elapsed} ms"

# zprof