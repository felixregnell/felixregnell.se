import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const debug = false;

/**
 * A proxy for console that only logs when debug is true
 */
export const debugConsole: Console = new Proxy(console, {
    get(target, prop: keyof Console) {
        const value = target[prop];
        if (typeof value === "function") {
            return (...args: unknown[]) => {
                if (debug) {
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    return (value as (...args: unknown[]) => unknown).apply(target, args);
                }
                // Return undefined when debug is false
                return undefined;
            };
        }
        return value;
    },
});