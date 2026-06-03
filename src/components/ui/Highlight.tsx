import React from "react";

/**
 * Highlight — now a no-op pass-through.
 *
 * The gold keyword/metric highlighting was removed from the app. This
 * component is kept as a thin wrapper so existing call sites
 * (<Highlight text={...} />) keep working and simply render the
 * original text with no styling.
 */
export function Highlight({ text }: { text: string }) {
  return <>{text}</>;
}
