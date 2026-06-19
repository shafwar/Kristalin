/** Shared location constants for Google Maps embed (query-based, no API key). */

export type KristalinLocationId = 'jakarta' | 'nabire';

export type KristalinLocation = {
    id: KristalinLocationId;
    lat: number;
    lng: number;
    zoom: number;
};

/** Menara 165 / ESQ Leadership Centre — TB Simatupang, Jakarta Selatan */
export const JAKARTA_HEAD_OFFICE: KristalinLocation = {
    id: 'jakarta',
    lat: -6.2897,
    lng: 106.8228,
    zoom: 16,
};

/**
 * Approximate operational area — Makimi District, Nabire (Musairo basin).
 * Replace lat/lng with official GPS pin once confirmed by operations team.
 */
export const NABIRE_OPERATIONS: KristalinLocation = {
    id: 'nabire',
    lat: -3.3644,
    lng: 135.4954,
    zoom: 11,
};

export function buildGoogleMapsEmbedUrl(location: KristalinLocation): string {
    const { lat, lng, zoom } = location;
    const q = encodeURIComponent(`${lat},${lng}`);
    return `https://maps.google.com/maps?q=${q}&z=${zoom}&output=embed`;
}

export function buildGoogleMapsExternalUrl(location: KristalinLocation): string {
    const { lat, lng } = location;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
