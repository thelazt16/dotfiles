const Hyprland = await Service.import("hyprland");
const { Box } = Widget;
import { getIcon } from "../../../functions/getIcon.js";

export const PinnedClients = () => {
  return Box({
    setup: (self) =>
      self.hook(Hyprland, () => {
        self.child = Box({
          children: Hyprland.bind("clients").as((clients) =>
            clients
              .filter((client) => client.pinned === true)
              .map((client) =>
                getIcon(client.initialClass, client.initialTitle)
              )
          ),
        });
      }),
  });
};
