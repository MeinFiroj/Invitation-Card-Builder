import { defaultWeddingData, templates } from '@/data/templates';

const toB64 = (str) => {
  let bin = '';
  new TextEncoder().encode(str).forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64 = (s) => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

export const sharePath = (data) => `/invite/card?d=${toB64(JSON.stringify(data))}`;
export const shareUrl = (data) => window.location.origin + sharePath(data);

// Returns { data, template } or null if the link is missing or broken
export function readSharedCard(code) {
  if (!code) return null;
  try {
    const data = { ...defaultWeddingData, ...JSON.parse(fromB64(code)) };
    return { data, template: templates.find((t) => t.id === data.templateId) ?? templates[0] };
  } catch {
    return null;
  }
}