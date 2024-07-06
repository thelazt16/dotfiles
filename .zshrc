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

# ┏┓┓┏┏┓  ┏┓┏┓┳┓┳┓┳┏┓┏┓
# ┣ ┗┫┣   ┃ ┣┫┃┃┃┃┃┣ ┗┓
# ┗┛┗┛┗┛  ┗┛┛┗┛┗┻┛┻┗┛┗┛
# Enable here if use p10k
# $HOME/bin/colorscript -r
# fortune

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#   source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi

# ╔═╗╔╦╗╔═╗  ╔═╗╔═╗╔╦╗╦ ╦╔═╗
# ║ ║║║║╔═╝  ╚═╗║╣  ║ ║ ║╠═╝
# ╚═╝╩ ╩╚═╝  ╚═╝╚═╝ ╩ ╚═╝╩
# check if oh-my-zsh is installed, otherwise install it.
export ZSH="$HOME/.oh-my-zsh"
if [[ ! -d ~/.oh-my-zsh ]]; then
    echo "\noh-my-zsh not installed. \n"
    echo "Installing Oh-My-ZSH"
    git clone https://github.com/ohmyzsh/ohmyzsh.git $ZSH 2> /dev/null && echo "Oh-My-ZSH was installed successfully" || echo "Failed to install Oh-My-ZSH"
    OMZ_CUSPLUG="$HOME/.oh-my-zsh/custom/plugins"
    CUSTOMPLUGINS=(
        zsh-users/zsh-autosuggestions
        zsh-users/zsh-completions
        zsh-users/zsh-syntax-highlighting
        Aloxaf/fzf-tab
        MichaelAquilina/zsh-auto-notify
        MichaelAquilina/zsh-you-should-use
    )
    for CUSTOMPLUGIN in "${CUSTOMPLUGINS[@]}"; do
        PLUGINPATH="$OMZ_CUSPLUG/${CUSTOMPLUGIN#*/}"

        # For some stupid plugins whose .zsh file different from the f*cking repo name
        [[ "${CUSTOMPLUGIN#*/}" == "zsh-auto-notify" ]] && PLUGINPATH="$OMZ_CUSPLUG/auto-notify"
        echo "\nInstalling ${CUSTOMPLUGIN#*/}"
        git clone https://github.com/"$CUSTOMPLUGIN" "$PLUGINPATH" 2> /dev/null && echo "${CUSTOMPLUGIN#*/} was installed successfully" || echo "Failed to install ${CUSTOMPLUGIN#*/}"
    done
    clear
fi

# ╔═╗╔╦╗╔═╗  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗╦ ╦╦═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
# ║ ║║║║╔═╝  ║  ║ ║║║║╠╣ ║║ ╦║ ║╠╦╝╠═╣ ║ ║║ ║║║║╚═╗
# ╚═╝╩ ╩╚═╝  ╚═╝╚═╝╝╚╝╚  ╩╚═╝╚═╝╩╚═╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
# ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(
    # git
    nvm
    auto-notify
    fzf-tab
    zsh-autosuggestions
    zsh-completions
    zsh-syntax-highlighting
    zsh-you-should-use
)
zstyle ':omz:update' mode auto
zstyle ':omz:update' frequency 7

zstyle ':omz:plugins:nvm' lazy yes
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
source $ZSH/oh-my-zsh.sh
eval "$(zoxide init zsh)"
# eval "$(fzf --zsh)"
eval "$(atuin init zsh)"
# eval "$(oh-my-posh init zsh --config $HOME/.config/ohmyposh/ohmyposh.toml)"

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

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
# [[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh