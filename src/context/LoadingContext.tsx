"use client";

import { createContext, useContext } from "react";

/**
 * True once the loading screen animation has finished and the page has been revealed.
 * Consumers (Hero, Navbar, etc.) should wait for this before starting their own
 * entrance animations so nothing plays while hidden under the loading screen.
 */
export const LoadingContext = createContext<boolean>(false);

export function useLoadingComplete(): boolean {
  return useContext(LoadingContext);
}
