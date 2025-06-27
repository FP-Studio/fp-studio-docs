export const slugifyName = (name: string): string =>
  name.trim().toLowerCase().replaceAll(/\s+/g, '_');
