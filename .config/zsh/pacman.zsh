# ╔═╗╔═╗╔═╗╔╦╗╔═╗╔╗╔
# ╠═╝╠═╣║  ║║║╠═╣║║║
# ╩  ╩ ╩╚═╝╩ ╩╩ ╩╝╚╝

alias mirrors="sudo reflector --verbose --protocol "http,https" --exclude "jingk" --latest 20 --score 20 --country 'Australia,Singapore,Japan,\"South Korea\",Indonesia' --age 12 --sort rate --save /etc/pacman.d/mirrorlist"
alias update="yay -Syyu --noconfirm --removemake --answerupgrade y --overwrite"
alias yays="yay --noconfirm --noanswerclean --noanswerdiff --noansweredit --removemake"
alias mantenimiento="yay -Sc && sudo pacman -Scc"
alias purgeit="sudo pacman -Rns $(pacman -Qtdq) ; sudo fstrim -av"

# alias update="paru -Syyu --nocombinedupgrade"
