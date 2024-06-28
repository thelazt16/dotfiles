const Hyprland = await Service.import("hyprland");
const { Box, Button, Label } = Widget;
import { getIcon } from "../../../functions/getIcon.js";

export const WorkspaceClients = () => {
  const dispatch = (
    /** @type {string | number} */ ws,
    /** @type {string} */ address
  ) =>
    Hyprland.messageAsync(
      `dispatch movetoworkspacesilent special:${ws},address:${address}`
    );

  return Box({
    className: "workspace-clients",
    setup: (self) =>
      self.hook(Hyprland, () => {
        self.children = [
          Label({
            label: "clients",
          }),
          Box({
            class_name: "icon",
            children: Hyprland.bind("clients").as((clients) =>
              clients
                .filter(
                  (client) =>
                    client.workspace.id === Hyprland.active.workspace.id
                )
                .map((client) =>
                  Button({
                    child: getIcon(client.initialClass, client.initialTitle, 1),
                    onClicked: () =>
                      dispatch(client.workspace.id, client.address),
                  })
                )
            ),
          }),
        ];
      }),
  });
};
