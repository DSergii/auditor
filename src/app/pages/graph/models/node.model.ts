export interface Node {
  completion: string;
  process_count: string;
  process_detail_completed: string;
  creator_id: number;
  id: number;
  name: string;
  node_id: number;
  node_status_current_user: string;
  node_type: number;
  node_type_string: string;
  node_menu_set: string;
  parent_id: number;
  process_delegatee: number;
  process_delegator: number;
  process_detail_clickable: number;
  rpa_delegatee: number;
  rpa_delegator: number;
  show_menu_add: boolean;
  show_menu_delete: boolean;
  show_menu_process_delegate: boolean;
  show_menu_process_resource_cost: boolean;
  show_menu_rename: boolean;
  show_menu_rpa_delegate: boolean;
  show_menu_rpa_resource_cost: boolean;
  tooltip: string;
}