import { ReactNode } from "react";

export interface Permission {
  id: string;
  module: string;
  action: "view" | "create" | "edit" | "delete" | "approve";
  description: string;
}

export interface Role {
  id: string;
  name: string;
  color: string;
  icon: ReactNode;
  permissions: string[];
  apiPermissionIds?: number[]; // List of API permission IDs the role can access
  status: "active" | "inactive";
}
