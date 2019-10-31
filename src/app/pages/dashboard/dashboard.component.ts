import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { Router } from '@angular/router';
import { DashboardService } from './services/dashboard.service';
import { StorageHelper } from '../../shared/helpers/storage-helper';
import { ToastrService } from 'ngx-toastr';
import { EventHandlerService } from '../../shared/services/event-handler.service';

@Component({
  selector: 'rpa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('table', {static: true}) table: ElementRef;
  public charts = ['Org Chart Name'];
  public userOrganization: string;

  constructor(
    private router: Router,
    private dashboardSrv: DashboardService,
    private toastr: ToastrService,
    private eventHendlerSrv: EventHandlerService
  ) { }

  ngOnInit() {
    StorageHelper.addToStorage(1, 'zoom');
    const user = StorageHelper.getFromStorage('user');
    if(user) {
      this.userOrganization = user.organization.name;
    }
    this.eventHendlerSrv.$.subscribe( organization => {
      this.userOrganization = organization;
    });
    this.dashboardSrv.getDelegateeStatus()
      .subscribe( (res: {delegatee_status: Array<any>}) => {
        this.initTable(res.delegatee_status);
      }, error => {

      });
  }

  initTable(tableData: Array<any>): void {
    const that = this;
    const actionButtons = (value, data, cell, row, options) => {
      const emailShow = value._cell.row.data['show_icon_email'] ? '' : 'hide';
      const delegateeShow = value._cell.row.data['show_icon_delegate'] ? '' : 'hide';
      const deleteShow = value._cell.row.data['show_icon_delete'] ? '' : 'hide';
      return "<div class='action-holder'><span class='email-btn "+ emailShow +"'></span><span class='delegatee-btn "+ delegateeShow +"'></span><span class='delete-btn "+deleteShow+"'></span></div>"
    };

    let data = [];
    const columns = [
      {title: "Type", field:"type", sorter:"string"},
      {title: "Name", field:"name"},
      {title: "Deadline", field:"deadline", sorter:"date", sorterParams: { format: "DD/MM/YYYY HH:mm:ss" }},
      {title: "Complete", field:"com"},
      {title: "Delegatee", field: "delegatee"},
      {title: "Actions", headerSort:false, formatter: actionButtons, cellClick: function actionHandler(e, cell) {
          const nodeId = cell._cell.row.data.node_id;
          const delegateeId = cell._cell.row.data.delegatee_id;
          if(e.target.closest('.email-btn')) {
            that.dashboardSrv.emailDelegatee({node_id: nodeId, delegatee_id: delegateeId})
              .subscribe( res => {
                if(res.status) {
                  that.toastr.success(res.status);
                }
              }, error => {
                that.toastr.error('Something went wrong');
              });
          }
          if(e.target.closest('.delegatee-btn')) {
            that.router.navigate(['/delegate-to'], { queryParams: { assigner: delegateeId, node: nodeId } })
          }
          if(e.target.closest('.delete-btn')) {
            that.dashboardSrv.deleteDelegatee({node_id: nodeId, delegatee_id: delegateeId})
              .subscribe( res => {
                if(res.status) {
                  that.toastr.success(res.status);
                }
              }, error => {
                that.toastr.error('Something went wrong');
              });
          }
        }
      }
    ];

    tableData.forEach( (d, i) => {
      let dataObj = {
        id: i+1,
        type: d['Type'],
        name: d['Name'],
        deadline: d['Deadline'],
        com: d['Complete'],
        delegatee: d['Delegatee'],
        delegatee_id: d['delegatee_id'],
        node_id: d['node_id'],
        show_icon_delegate: d['show_icon_delegate'],
        show_icon_delete: d['show_icon_delete'],
        show_icon_email: d['show_icon_email']
      };
      data.push(dataObj);
    });

    const table = new Tabulator(this.table.nativeElement, {
      height: 235,
      data: data,
      layout:"fitColumns",
      columns: columns,
    });

    switch(tableData.length) {
      case 4: table.setHeight(195);
        break;
      case 3: table.setHeight(155);
        break;
      case 2: table.setHeight(115);
        break;
      case 1: table.setHeight(75);
        break;
      default: table.setHeight(235);
        break;
    }
  }

}
