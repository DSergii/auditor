import { Node } from './node.model';

export interface Chart {
  org_chart: Array<Node>;
  org_name: string;
}