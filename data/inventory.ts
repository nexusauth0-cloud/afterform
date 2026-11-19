/**
 * Illustrative inventory.
 *
 * There is no warehouse or commerce backend connected to this project.
 * The numbers below are demo allocation values so the storefront can
 * exercise availability, low-stock and sold-out states honestly.
 */

export const DEMO_STOCK: Record<string, number> = {
  "7": 0,
  "7.5": 3,
  "8": 5,
  "8.5": 8,
  "9": 2,
  "9.5": 11,
  "10": 6,
  "10.5": 4,
  "11": 2,
  "11.5": 0,
  "12": 1,
  "13": 0,
};

export const inventoryMeta = {
  isLiveWarehouse: false,
  note: "Illustrative allocation — not live warehouse inventory.",
  lowStockThreshold: 3,
};

export const DEMO_ALLOCATION = Object.values(DEMO_STOCK).reduce(
  (sum, stock) => sum + stock,
  0,
);
