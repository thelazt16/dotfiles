const Hyprland = await Service.import("hyprland");
const { Box, Button, Label } = Widget;
import { getIcon } from "../../../functions/getIcon.js";

export const WorkspaceAndSpecialClients = () => {
  const hide = (
    /** @type {string | number} */ ws,
    /** @type {string} */ address
  ) =>
    Hyprland.messageAsync(
      `dispatch movetoworkspacesilent special:${ws},address:${address}`
    );

  const show = (
    /** @type {string | number} */ ws,
    /** @type {string} */ address
  ) =>
    Hyprland.messageAsync(
      `dispatch movetoworkspacesilent ${ws},address:${address}`
    );

  return Box({
    className: "clients",
    children: [],
    setup: (self) =>
      self.hook(Hyprland.active.workspace, () => {
        self.children = [
          Box({
            className: "client",
            children: Hyprland.bind("clients").as((clients) =>
              clients
                // .sort((a, b) => a.address.localeCompare(b.address)) // Sort clients by address
                .filter(
                  (client) =>
                    client.workspace.id === Hyprland.active.workspace.id ||
                    client.workspace.name ===
                      `special:${Hyprland.active.workspace.id}`
                )
                .map((client) =>
                  Button({
                    className: "client-button",
                    child: getIcon(
                      client.initialClass,
                      client.initialTitle,
                      client.workspace.name ===
                        `special:${Hyprland.active.workspace.id}`
                        ? 0.4
                        : 1
                    ),
                    onClicked: () =>
                      client.workspace.name ===
                      `special:${Hyprland.active.workspace.id}`
                        ? show(
                            client.workspace.name.split(":")[1],
                            client.address
                          )
                        : hide(client.workspace.id, client.address),
                  })
                )
            ),
          }),
        ];
      }),
  });
};
