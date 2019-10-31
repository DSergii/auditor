import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GraphService } from './services/graph.service';
import { StorageHelper } from '../../shared/helpers/storage-helper';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddNodeComponent } from './add-node/add-node.component';
import { zip } from 'rxjs';
declare var OrgChart: any;

/**
 * models
 */
import { User } from '../../shared/models/user.model';
import { Node } from './models/node.model';
import { Chart } from './models/chart.model';

@Component({
  selector: 'rpa-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy {

  @ViewChild('orgchart', {static: true}) orgchart: ElementRef;

  private chart: any;
  private user: User;
  public userExist: boolean = false;
  private modalRef: BsModalRef;
  private nodeTypesDictionary: {[key:number]: string} = {};
  private nodeTypes: any;
  public nodeName: string = '';
  public chartInfo: Chart;

  constructor(
    private graphSrv: GraphService,
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {

    this.user = StorageHelper.getFromStorage('user');

    if(this.user && this.user.id) {
      zip(this.graphSrv.getNodeTypes(), this.graphSrv.getOrgChart())
        .subscribe(([nodeTypes, chartData]) => {
          this.chartInfo = chartData;

          //nodeTypes
          if(nodeTypes) {
            this.nodeTypes = nodeTypes;
            nodeTypes.forEach(type => {
              this.nodeTypesDictionary[type.id] = type.name;
            });
          }

          //chart data
          if(chartData) {

            //division
            OrgChart.templates.divisionTemplate = Object.assign({}, OrgChart.templates.olivia);
            OrgChart.templates.divisionTemplate.size = [240, 80];
            OrgChart.templates.divisionTemplate.node =
              '<rect class="div_node" fill="#ffffff" rx="4" ry="4" width="240" height="80" x="0" y="0" stroke="#424D5E"></rect>' +
              '<rect x="0" y="0" width="80" height="45" fill="#424D5E" transform="rotate(-90 40 40)" stroke="#424D5E"></rect>';
            OrgChart.templates.divisionTemplate.nodeMenuButton =
              '<g style="cursor:pointer;" transform="matrix(1,0,0,1,215,68)" control-node-menu-id="{id}">' +
              '<rect x="-4" y="-10" fill="transparent" fill-opacity="1" width="22" height="22"></rect>' +
              '<circle cx="0" cy="0" r="2" fill="#D6D6D6"></circle>' +
              '<circle cx="7" cy="0" r="2" fill="#D6D6D6"></circle>' +
              '<circle cx="14" cy="0" r="2" fill="#D6D6D6"></circle>' +
              '</g>';
            OrgChart.templates.divisionTemplate.plus =
              '<circle cx="10" cy="15" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="16" y2="15" stroke-width="1" stroke="#aeaeae"></line>'
              + '<line x1="10" y1="8" x2="10" y2="22" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.divisionTemplate.minus =
              '<circle cx="10" cy="15" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="16" y2="15" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.divisionTemplate.expandCollapseSize = 18;
            OrgChart.templates.divisionTemplate.field_0 =
              '<text class="field_0" style="font-size: 14px;" width="180" text-overflow="ellipsis" fill="##494949" x="120" y="20" text-anchor="middle">{val}</text>';
            OrgChart.templates.divisionTemplate.field_1 =
              '<text class="field_1" style="font-size: 10px;" text-overflow="ellipsis" transform="rotate(-90 40 40)" fill="#ffffff" x="40" y="13" text-anchor="middle">{val}</text>';
            OrgChart.templates.divisionTemplate.field_2 =
              '<text class="field_2" style="font-size: 10px;" text-overflow="ellipsis" transform="rotate(-90 40 40)" fill="#ffffff" x="40" y="38" text-anchor="middle">{val}</text>';
            OrgChart.templates.divisionTemplate.field_3 =
              '<text class="field_3" style="font-size: 8px;" fill="#494949" x="75" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.divisionTemplate.field_4 =
              '<text class="field_4" style="font-size: 8px;" fill="#494949" x="170" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.divisionTemplate.field_6 =
              '<rect class="div_node" fill="transparent" rx="4" ry="4" width="240" height="80" x="0" y="0"><title>{val}</title></rect>';

            //department
            OrgChart.templates.departmentTemplate = Object.assign({}, OrgChart.templates.olivia);
            OrgChart.templates.departmentTemplate.plus =
              '<circle cx="10" cy="15" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="16" y2="15" stroke-width="1" stroke="#aeaeae"></line>'
              + '<line x1="10" y1="8" x2="10" y2="22" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.departmentTemplate.minus =
              '<circle cx="10" cy="15" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="16" y2="15" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.departmentTemplate.expandCollapseSize = 18;
            OrgChart.templates.departmentTemplate.size = [240, 80];
            OrgChart.templates.departmentTemplate.node =
              '<rect class="dep_node" fill="#ffffff" rx="4" ry="4" width="240" height="80" stroke="#0ED9DC" x="0" y="0"></rect>' +
              '<rect x="0" y="0" width="80" height="45" fill="#0ED9DC" transform="rotate(-90 40 40)" stroke="#0ED9DC"></rect>';
            OrgChart.templates.departmentTemplate.nodeMenuButton =
              '<g style="cursor:pointer;" transform="matrix(1,0,0,1,215,68)" control-node-menu-id="{id}">' +
              '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect>' +
              '<circle cx="0" cy="0" r="2" fill="#D6D6D6"></circle>' +
              '<circle cx="7" cy="0" r="2" fill="#D6D6D6"></circle>' +
              '<circle cx="14" cy="0" r="2" fill="#D6D6D6"></circle></g>';
            OrgChart.templates.departmentTemplate.field_0 =
              '<text class="field_0" style="font-size: 14px;" width="180" text-overflow="ellipsis" fill="#494949" x="80" y="20" dx="-20" text-anchor="start">{val}</text>';
            OrgChart.templates.departmentTemplate.field_1 =
              '<text class="field_1" style="font-size: 10px;" text-overflow="ellipsis" transform="rotate(-90 40 40)" fill="#ffffff" x="40" y="13" text-anchor="middle">{val}</text>';
            OrgChart.templates.departmentTemplate.field_2 =
              '<text class="field_2" style="font-size: 10px;" text-overflow="ellipsis" transform="rotate(-90 40 40)" fill="#ffffff" x="40" y="38" text-anchor="middle">{val}</text>';
            OrgChart.templates.departmentTemplate.field_3 =
              '<text class="field_3" style="font-size: 8px;" fill="#494949" x="75" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.departmentTemplate.field_4 =
              '<text class="field_4" style="font-size: 8px;" fill="#494949" x="170" y="70" text-anchor="middle">{val}</text>' +
              '<circle cx="121" cy="67" r="3" fill="#0ED9DC"></circle>';
            OrgChart.templates.departmentTemplate.field_6 =
              '<rect class="div_node" fill="transparent" rx="4" ry="4" width="240" height="80" x="0" y="0"><title>{val}</title></rect>';

            //functional area
            OrgChart.templates.faTemplate = Object.assign({}, OrgChart.templates.olivia);
            OrgChart.templates.faTemplate.plus =
              '<circle cx="10" cy="15" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="16" y2="15" stroke-width="1" stroke="#aeaeae"></line>'
              + '<line x1="10" y1="8" x2="10" y2="22" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.faTemplate.minus =
              '<circle cx="10" cy="15" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="16" y2="15" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.faTemplate.expandCollapseSize = 18;
            OrgChart.templates.faTemplate.size = [240, 80];
            OrgChart.templates.faTemplate.node =
              '<rect class="dep_node" fill="#ffffff" rx="4" ry="4" width="240" height="80" x="0" y="0" stroke="#9FB5DB"></rect>' +
              '<rect x="0" y="0" width="80" height="45" fill="#9FB5DB" transform="rotate(-90 40 40)" stroke="#9FB5DB"></rect>';
            OrgChart.templates.faTemplate.nodeMenuButton =
              '<g style="cursor:pointer;" transform="matrix(1,0,0,1,215,68)" control-node-menu-id="{id}">' +
              '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect>' +
              '<circle cx="0" cy="0" r="2" fill="#D6D6D6"></circle>' +
              '<circle cx="7" cy="0" r="2" fill="#D6D6D6">' +
              '</circle><circle cx="14" cy="0" r="2" fill="#D6D6D6"></circle></g>';
            OrgChart.templates.faTemplate.field_0 =
              '<text class="field_0" style="font-size: 14px;" width="180" text-overflow="ellipsis" fill="#494949" x="70" y="20" dx="-20" text-anchor="start">{val}</text>';
            OrgChart.templates.faTemplate.field_1 =
              '<text class="field_1" style="font-size: 10px;" width="60" text-overflow="multiline" transform="rotate(-90 40 40)" fill="#ffffff" x="40" y="13" text-anchor="middle">{val}</text>';
            OrgChart.templates.faTemplate.field_2 =
              '<text class="field_2" style="font-size: 10px;" text-overflow="ellipsis" transform="rotate(-90 40 40)" fill="#ffffff" x="40" y="38" text-anchor="middle">{val}</text>';
            OrgChart.templates.faTemplate.field_3 =
              '<text class="field_3" style="font-size: 8px;" fill="#494949" x="75" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.faTemplate.field_4 =
              '<text class="field_4" style="font-size: 8px;" fill="#494949" x="170" y="70" text-anchor="middle">{val}</text>' +
              '<circle cx="121" cy="67" r="3" fill="#9FB5DB"></circle>';
            OrgChart.templates.faTemplate.field_6 =
              '<rect class="div_node" fill="transparent" rx="4" ry="4" width="240" height="80" x="0" y="0"><title>{val}</title></rect>';

            //process
            OrgChart.templates.processTemplate = Object.assign({}, OrgChart.templates.olivia);
            OrgChart.templates.processTemplate.plus =
              '<circle cx="10" cy="15" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="16" y2="15" stroke-width="1" stroke="#aeaeae"></line>'
              + '<line x1="10" y1="8" x2="10" y2="22" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.processTemplate.minus =
              '<circle cx="10" cy="15" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
              + '<line x1="4" y1="15" x2="16" y2="15" stroke-width="1" stroke="#aeaeae"></line>';
            OrgChart.templates.processTemplate.expandCollapseSize = 18;
            OrgChart.templates.processTemplate.size = [240, 80];
            OrgChart.templates.processTemplate.node =
              '<rect class="dep_node" fill="#ffffff" rx="4" ry="4" width="240" height="80" x="0" y="0" stroke="#DBD39F"></rect>' +
              '<rect x="0" y="0" width="80" height="45" fill="#DBD39F" transform="rotate(-90 40 40)" stroke="#DBD39F"></rect>';
            OrgChart.templates.processTemplate.nodeMenuButton =
              '<g style="cursor:pointer;" transform="matrix(1,0,0,1,215,68)" control-node-menu-id="{id}">' +
              '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect>' +
              '<circle cx="0" cy="0" r="2" fill="#D6D6D6"></circle>' +
              '<circle cx="7" cy="0" r="2" fill="#D6D6D6">' +
              '</circle><circle cx="14" cy="0" r="2" fill="#D6D6D6"></circle></g>';
            OrgChart.templates.processTemplate.field_0 =
              '<text class="field_0" style="font-size: 14px;" width="180" text-overflow="ellipsis" fill="#494949" x="50" y="20" text-anchor="start">{val}</text>';
            OrgChart.templates.processTemplate.field_1 =
              '<text class="field_1" style="font-size: 10px;" text-overflow="ellipsis" transform="rotate(-90 40 40)" fill="#ffffff" x="40" y="13" text-anchor="middle">{val}</text>';
            OrgChart.templates.processTemplate.field_2 =
              '<text class="field_2" style="font-size: 10px;" text-overflow="ellipsis" transform="rotate(-90 40 40)" fill="#ffffff" x="40" y="38" text-anchor="middle">{val}</text>';
            OrgChart.templates.processTemplate.field_3 =
              '<text class="field_3" style="font-size: 8px;" fill="#494949" x="75" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.processTemplate.field_4 =
              '<text class="field_4" style="font-size: 8px;" fill="#494949" x="170" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.processTemplate.field_5 =
              '<text class="field_5" style="font-size: 8px;" fill="#1bba50" x="80" y="70" text-anchor="middle">{val}</text>';
            OrgChart.templates.processTemplate.field_6 =
              '<rect class="div_node" fill="transparent" rx="4" ry="4" width="240" height="80" x="0" y="0"><title>{val}</title></rect>';

            this.init(this.chartInfo.org_chart);
          }
        }, error => {

        });
    } else {
      this.userExist = true;
    }
  }

  ngOnDestroy() {
    //this.renderer.destroyNode(this.orgchart.nativeElement);
    this.chart = {};
  }

  init(data) {

    const scale = StorageHelper.getFromStorage('zoom') ? StorageHelper.getFromStorage('zoom') : 1;

    const delegateHandler = (nodeId) => {
      const assigner = data.find(item => item.id == nodeId);
      this.router.navigate(['/delegate-to'], { queryParams: { assigner: assigner.creator_id, node: nodeId, name: assigner.name } })
    };

    const costHandler = (nodeId) => {
        this.router.navigate([`/resource-costs/${nodeId}`])
    };

    const addHandler = (nodeId) => {
      const node = data.find(item => item.id == nodeId);
      const child_node = this.nodeTypes.find(type =>type.id == node.node_type);
      const initialState = {type: 'add', nodeType: this.nodeTypesDictionary[child_node.child_node_type_id]};
      this.modalRef = this.modalService.show(AddNodeComponent, {initialState});
      this.modalRef.content.onClose.subscribe(result => {

        if(result) {
          const params = {
            name: result,
            org: 1,
            node_type: child_node.child_node_type_id,
            parent_node_id: nodeId,
            creator: this.user.id
          };

          this.graphSrv.addNode(params)
            .subscribe( (res: {node:Node, org_chart: Array<Node>, status: string}) => {
              this.init(res.org_chart);
            });
        }
      });
    };

    const deleteHandler = (node) => {
        this.graphSrv.deleteNode(node)
        .subscribe((res: {node_id: number, org_chart: Array<Node>, status: string}) => {
          this.init(res.org_chart);
          //this.chart.removeNode(node);
        }, error => {
          this.toastr.error(error.error.error);
        })
    };

    const editHandler = (nodeId) => {
      const node = this.chart.get(nodeId);
      const initialState = {type: 'edit', name: node.name, nodeType: node.node_type};
      this.modalRef = this.modalService.show(AddNodeComponent, {initialState});
      this.modalRef.content.onClose.subscribe(result => {

        if(result) {
          const params = {id: nodeId, name:result};
          this.graphSrv.updateNode(params)
            .subscribe( res => {
              if(res && res.status === 'Node successfuly updated') {
                node.name = result;
                this.chart.updateNode(node);
              }
            });
        }
      });
    };

    const menus = {
      menu_set_1: {
        add: { text: "Add", icon: '', onClick: addHandler },
      },
      menu_set_2: {
        add: { text: "Add", icon: '', onClick: addHandler },
        edit: {text: "Rename", icon: '', onClick: editHandler },
      },
      menu_set_3: {
        add: { text: "Add", icon: '', onClick: addHandler },
        edit: {text: "Rename", icon: '', onClick: editHandler },
        process_delegate: { text: "Assign Process", icon: '', onClick: delegateHandler },
      },
      menu_set_4: {
        remove: { text: "Delete", icon: '', onClick: deleteHandler },
        edit: {text: "Rename", icon: '', onClick: editHandler },
        process_delegate: { text: "Assign Process", icon: '', onClick: delegateHandler },
      },
      menu_set_5: {
        add: { text: "Add", icon: '', onClick: addHandler },
        edit: {text: "Rename", icon: '', onClick: editHandler },
        remove: { text: "Delete", icon: '', onClick: deleteHandler },
        process_delegate: { text: "Assign Process", icon: '', onClick: delegateHandler },
      },
      menu_set_6: {
        add: { text: "Add", icon: '', onClick: addHandler },
        edit: {text: "Rename", icon: '', onClick: editHandler },
        remove: { text: "Delete", icon: '', onClick: deleteHandler },
        process_delegate: { text: "Assign Process", icon: '', onClick: delegateHandler },
        process_cost: { text: "Process Resource Costs", icon: '', onClick: costHandler },
      },
      menu_set_7: {
        add: { text: "Add", icon: '', onClick: addHandler },
        edit: {text: "Rename", icon: '', onClick: editHandler },
        process_delegate: { text: "Assign Process", icon: '', onClick: delegateHandler },
        process_cost: { text: "Process Resource Costs", icon: '', onClick: costHandler },
      },
      menu_set_8: {
        rpa_delegate: { text: "Assign RPA", icon: '', onClick: delegateHandler },
      },
      menu_set_9: {
        rpa_cost: { text: "RPA Resource Costs", icon: '', onClick: costHandler },
      },
      menu_set_10: {
        rpa_cost: { text: "RPA Resource Costs", icon: '', onClick: costHandler },
        rpa_delegate: { text: "Assign RPA", icon: '', onClick: delegateHandler },
      },
      no_menu_set: {}
    };

    this.chart = new OrgChart(this.orgchart.nativeElement, {
      template: "ana",
      enableDragDrop: false,
      nodeMouseClick: OrgChart.action.none,
      zoom: {
        speed: 40,
        smooth: 15
      },
      scaleInitial: scale,
      scaleMin: 0.2,
      scaleMax: 1,
      layout: OrgChart.normal,
      nodeMenu: {
        add: { text: "Add", icon: '', onClick: addHandler },
        remove: { text: "Delete", icon: '', onClick: deleteHandler },
        edit: {text:"Rename", icon: '', onClick: editHandler },
        delegate: { text: "Assign", icon: '', onClick: delegateHandler }
      },
      nodeBinding: {
        field_0: "name",
        field_1: "node_type",
        field_2: "node_status",
        field_3: "process",
        field_4: "status",
        field_5: "completed",
        field_6: "tooltip"
      },
      tags: {
        "Division": {
          template: "divisionTemplate",
        },
        "Department": {
          template: "departmentTemplate",
        },
        "Functional Area": {
          template: "faTemplate",
        },
        "Process": {
          template: "processTemplate",
        },
        "Sub Process": {
          template: "ana",
        }
      },
      nodes: this.createNodes(data, this.user.id),
      onClick: (sender, node) => {
        if(node.node_type === 'Process') {
          this.router.navigate([`/process-detail/${node.id}`], { queryParams: { name: node.name } })
        }
        return this.user.id == node.creator_id;
      },
      onRedraw: (sender) => {
        StorageHelper.addToStorage(sender.getScale().toFixed(1), 'zoom');
      },
    });

    this.chart.on('dbclick', (sender, node) => {

    });

    //override menus
    this.chart.nodeMenuUI.on('show', (sender, args) => {
      const currentNode = data.filter(node => node.node_id == args.firstNodeId);
      args.menu = menus[currentNode[0].node_menu_set];
    });
  }

  /**
   * generate nodes based on endpoint data
   * @param {Array<any>} chartData
   * @param userId
   * @returns {Array<any>}
   */
  createNodes(chartData: Array<Node>, userId: number): Array<any> {
    let nodes = [];
    chartData.forEach((data, i) => {
      let node = {
        id: data.id,
        tags: this.detectAreaTag(data, userId),
        name: data.name,
        pid: data.parent_id,
        process: data.process_count,
        node_status: data.node_status_current_user,
        node_type: data.node_type_string,
        status: data.completion,
        completed: data.process_detail_completed,
        creator_id: data.creator_id,
        menu_set: data.node_menu_set,
        tooltip: data.tooltip
      };
      nodes.push(node);
    });
    return nodes;
  }

  detectAreaTag(node, userId): Array<string> {
    return [this.nodeTypesDictionary[node.node_type]]
  }

}
