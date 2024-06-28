const Hyprland = await Service.import("hyprland");
const { Box, Button, Label } = Widget;
import { getIcon } from "../../../functions/getIcon.js";

export const SpecialClients = () => {
  const dispatch = (
    /** @type {string | number} */ ws,
    /** @type {string} */ address
  ) =>
    Hyprland.messageAsync(
      `dispatch movetoworkspacesilent ${ws},address:${address}`
    );

  return Box({
    className: "special-clients",
    setup: (self) =>
      self.hook(, () => {
        self.children = [
          Label({
            label: "hidden",
          }),
          Box({
            class_name: "icon",
            children: Hyprland.bind("clients").as((clients) =>
              clients
                .filter(
                  (client) =>
                    client.workspace.name ===
                    `special:${Hyprland.active.workspace.id}`
                )
                .map((client) =>
                  Button({
                    child: getIcon(client.initialClass, client.initialTitle, 1),
                    onClicked: () =>
                      dispatch(
                        client.workspace.name.split(":")[1],
                        client.address
                      ),
                  })
                )
            ),
          }),
        ];
      }),
  });
};
