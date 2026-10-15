export type AsanaUser = {
  gid: string;
  name?: string;
}

export type AsanaProject = {
  gid?: string;
  name: string;
}

export type AsanaTask = {
  gid: string;
  name: string;
  created_at?: string;
  completed?: boolean;
  completed_at?: string | null;
  completed_by?: AsanaUser | null;
  assignee?: AsanaUser | null;
  permalink_url?: string;
  parent?: null | {
    projects: AsanaProject[];
  }
  projects?: AsanaProject[];
  resource_subtype?: string;
}
