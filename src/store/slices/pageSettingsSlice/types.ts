export interface PageSettingsSchema {
   fontSettings: {
      fontStyle: string;
      textSize: "small" | "default";
   };
   pageSettings: {
      fullWidth: boolean;
      isPageLocked: boolean;
   };
}
