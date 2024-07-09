const { Box } = Widget;
// import { WorkspaceClients } from "./clients/workspaceClients.js";
// import { SpecialClients } from "./clients/specialClients.js";
// import { PinnedClients } from "./clients/pinnedClients.js";
import { WorkspaceAndSpecialClients } from "./clients/workspaceAndSpecialClients.js";

// TODO: Add functions to get special workspace attached to each workspace
// TODO: Add pinned clients
// export const Clients = () => {
//   return Box({
//     setup: (self) =>
//       self.hook(Hyprland, () => {
//         self.child = Box({
//           // children: [WorkspaceClients(), SpecialClients(), PinnedClients()],
//           children: [WorkspaceAndSpecialClients()],
//         });
//       }),
//   });
// };

export const Clients = () =>
	Box({
		child: WorkspaceAndSpecialClients(),
	});
