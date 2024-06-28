const { Button, Icon } = Widget;
import { getIcon } from "../../functions/getIcon.js";

export const OSIcon = () =>
  Button({
    className: "os-icon",
    child: Icon({ icon: "cachyos" }),
    onClicked: () =>
      Utils.execAsync(
        `bash -c '(pidof rofi && pkill rofi) || rofi -show drun -theme "$HOME"/.config/bspwm/scripts/Launcher.rasi'`
      ),
  });
