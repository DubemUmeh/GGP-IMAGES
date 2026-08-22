export const PERMISSIONS = [
  "GALLERY_VIEW",
  "GALLERY_UPLOAD",
  "GALLERY_EDIT",
  "GALLERY_DELETE",
  "BOOKINGS_VIEW",
  "BOOKINGS_EDIT",
  "BOOKINGS_DELETE",
  "SETTINGS_VIEW",
  "SETTINGS_EDIT",
  "ADMINS_VIEW",
  "ADMINS_INVITE",
  "ADMINS_REVOKE",
  "ADMINS_EDIT",
  "ROLES_VIEW",
  "ROLES_CREATE",
  "ROLES_EDIT",
  "ROLES_DELETE",
] as const;

export type PermissionName = (typeof PERMISSIONS)[number];

export type AdminContext = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: {
    id: string;
    name: string;
    isSuperAdmin: boolean;
  };
  permissions: string[];
};
