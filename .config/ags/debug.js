const hyprland = await Service.import("hyprland");

const hypr = () => console.log(hyprland);
const active = () => console.log("\nHyprland.active", hyprland.active); // JSON array of active client, monitor, workspace
const monitors = () => console.log("\nHyprland.monitors", hyprland.monitors); // JSON array of monitors
const workspaces = () =>
  console.log("\nHyprland.workspaces", hyprland.workspaces); // JSON array of workspaces
const clients = () => console.log("\nHyprland.clients", hyprland.clients); // JSON array of clients

export const debug = {
  hypr: hypr,
  active: active,
  monitors: monitors,
  workspaces: workspaces,
  clients: clients,
};
