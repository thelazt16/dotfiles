/*
There are 2 ways to hook a function

1. Hook to the component itself.
======================================
Box({
  className: "",
}).hook(Hyprland, (self) => {
  })
======================================
export const Workspaces = () => {
  const dispatch = (ws) =>
    Hyprland.messageAsync(`dispatch workspace ${ws}`);

  return EventBox({
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    className: "workspaces",
    child: Box({
      children: Array.from({ length: 9 }, (_, i) => i + 1).map((i) =>
        Button({
          attribute: i,
          onClicked: () => dispatch(i),
        })
      ),
    }).hook(Hyprland, (self) => {
      self.children.forEach((button) => {
        const isActive = Hyprland.active.workspace.id === button.attribute;
        const isOccupied = Hyprland.workspaces.some(
          (item) => item.id === button.attribute
        );
        if (isActive) {
          button.class_name = "workspace-button focused";
          button.label = "󰮯";
        } else if (isOccupied) {
          button.class_name = "workspace-button occupied";
          button.label = "󰊠";
        } else {
          button.class_name = "workspace-button normal";
          button.label = "";
        }
      });
    }),
  });
};

2. Place the hook inside the component
======================================
Box({
  className: "",
  setup: (self) =>
        self.hook(Hyprland, () => {}
})
======================================
export const Workspaces = () => {
  const dispatch = (ws) =>
    Hyprland.messageAsync(`dispatch workspace ${ws}`);

  return EventBox({
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    className: "workspaces",
    child: Box({
      children: Array.from({ length: 9 }, (_, i) => i + 1).map((i) =>
        Button({
          attribute: i,
          onClicked: () => dispatch(i),
        })
      ),

      // Hook to update className of the buttons in case of change in Hyprland
      setup: (self) =>
        self.hook(Hyprland, () => {
          self.children.forEach((btn) => {
            const isActive = Hyprland.active.workspace.id === btn.attribute;
            const isOccupied = Hyprland.workspaces.some(
              (item) => item.id === btn.attribute
            );
            if (isActive) {
              btn.class_name = "workspace-button focused";
              btn.label = "󰮯";
            } else if (isOccupied) {
              btn.class_name = "workspace-button occupied";
              btn.label = "󰊠";
            } else {
              btn.class_name = "workspace-button normal";
              btn.label = "";
            }
          });
        }),
    }),
  });
};



*/
