// ── Rangos para la captura automática ─────────────────────────────────────────
export const TILT_MIN = 40; // grados mínimos de inclinación
export const TILT_MAX = 60; // grados máximos de inclinación
export const NORTH_TOLERANCE = 15; // tolerancia +-15° desde el norte (0°)

// ── Helpers ────────────────────────────────────────────────────────────────────
export function calcInclination(x: number, y: number, z: number): number {
  return (Math.atan2(Math.sqrt(x * x + y * y), Math.abs(z)) * 180) / Math.PI;
}

export function isNorth(heading: number): boolean {
  return heading >= 360 - NORTH_TOLERANCE || heading <= NORTH_TOLERANCE;
}
