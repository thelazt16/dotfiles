# ███████╗███████╗██╗  ██╗     ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ 
# ╚══███╔╝██╔════╝██║  ██║    ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ 
#   ███╔╝ ███████╗███████║    ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
#  ███╔╝  ╚════██║██╔══██║    ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
# ███████╗███████║██║  ██║    ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
# ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝ 
# thelazt16
# github.com/thelazt16
# Figlet font: ANSI Shadow, Calvin S, tmplr

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
    # git clone git@github.com:Aloxaf/fzf-tab.git $OMZ_CUSPLUG/fzf-tab
    clear
fi

# ╔═╗╔╦╗╔═╗  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗╦ ╦╦═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
# ║ ║║║║╔═╝  ║  ║ ║║║║╠╣ ║║ ╦║ ║╠╦╝╠═╣ ║ ║║ ║║║║╚═╗
# ╚═╝╩ ╩╚═╝  ╚═╝╚═╝╝╚╝╚  ╩╚═╝╚═╝╩╚═╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
# ZSH_THEME="robbyrussell" # Uncomment if not using starship
plugins=(
    bgnotify
    colored-man-pages
    command-not-found
    fzf-tab
    git
    nvm
    thefuck
    zsh-autosuggestions
    zsh-completions
    zsh-syntax-highlighting
    zsh-interactive-cd
)
zstyle ':omz:update' mode auto
zstyle ':omz:update' frequency 7
zstyle ':omz:plugins:nvm' lazy yes
zstyle ':omz:plugins:nvm' lazy-cmd node

# ╔╗ ╔═╗╔═╗╦╔═╗  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗╔═╗
# ╠╩╗╠═╣╚═╗║║    ║  ║ ║║║║╠╣ ║║ ╦╚═╗
# ╚═╝╩ ╩╚═╝╩╚═╝  ╚═╝╚═╝╝╚╝╚  ╩╚═╝╚═╝
ZSHDIR="$HOME/.config/zsh"
HISTSIZE=10000
SAVEHIST=10000

# ╦  ╦╔═╗╦═╗╦╔═╗╔╗ ╦  ╔═╗╔═╗
# ╚╗╔╝╠═╣╠╦╝║╠═╣╠╩╗║  ║╣ ╚═╗
#  ╚╝ ╩ ╩╩╚═╩╩ ╩╚═╝╩═╝╚═╝╚═╝
export EDITOR='code'
export BROWSER='firefox'
export HISTORY_IGNORE="(ls|cd|pwd|exit|sudo reboot|history|cd -|cd ..)"
git clone https://github.com/Aloxaf/fzf-tabious events
setopt LIST_PACKED		    # The completion menu takes less space.
setopt MENU_COMPLETE        # Automatically highlight first element of completion menu
setopt PROMPT_SUBST         # enable command substitution in prompt
setopt SHAREHISTORY         # share history to other prompt right away not at launch

# Completion styling
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle ':completion:*' menu no 
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

# ╔╗ ╦╔╗╔╔═╗╦═╗╦╔═╗╔═╗
# ╠╩╗║║║║╠═╣╠╦╝║║╣ ╚═╗
# ╚═╝╩╝╚╝╩ ╩╩╚═╩╚═╝╚═╝
# Sourcing binary directories to load to $PATH
if [ -d "$HOME/.local/bin" ] ; then 
    PATH="$HOME/.local/bin:$PATH"
fi
if [ -d "$HOME/bin" ]; then
    PATH="$HOME/bin:$PATH"
fi

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
if which wg > /dev/null 2>&1; then
    source "$ZSHDIR/wireguard.zsh"
fi
# check if pacman is installed, then source the aliases
if which pacman > /dev/null 2>&1; then
    source "$ZSHDIR/pacman.zsh"
fi

# ╔═╗╔╦╗╔╦╗
# ║  ║║║ ║║
# ╚═╝╩ ╩═╩╝
# source aliases.zsh so that any changes made will be applied on enter
precmd() {
    source "$ZSHDIR/aliases.zsh"
}

# ╦╔╗╔╦╔╦╗╦╔═╗╦  ╦╔═╗╔═╗╔╦╗╦╔═╗╔╗╔
# ║║║║║ ║ ║╠═╣║  ║╔═╝╠═╣ ║ ║║ ║║║║
# ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝╩╚═╝╩ ╩ ╩ ╩╚═╝╝╚╝
eval "$(starship init zsh)"
source $ZSH/oh-my-zsh.sh
eval "$(zoxide init zsh)"
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
eval "$(atuin init zsh)"

# ┏┓┓┏┏┓  ┏┓┏┓┳┓┳┓┳┏┓┏┓
# ┣ ┗┫┣   ┃ ┣┫┃┃┃┃┃┣ ┗┓
# ┗┛┗┛┗┛  ┗┛┛┗┛┗┻┛┻┗┛┗┛
# Last but not least, UNLEASH the eye candies
$HOME/bin/colorscript -r
fortune
