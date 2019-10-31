import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AnalyticsService } from '../services/analytics.service';
import Tabulator from 'tabulator-tables';

@Component({
  selector: 'rpa-audit-status',
  templateUrl: './audit-status.component.html',
  styleUrls: ['./audit-status.component.css']
})
export class AuditStatusComponent implements OnInit {

  @ViewChild('audit', {static: true}) audit: ElementRef;
  @ViewChild('table', {static: true}) table: ElementRef;
  public auditTitle: {title: string, tooltip: string} = {title:'', tooltip:''};

  constructor(
    private analyticsSrv: AnalyticsService,
  ) { }

  ngOnInit() {
    this.analyticsSrv.getAuditAnalytics()
      .subscribe( data => {
        this.auditChartInit(data['audit_status_bar_data']);
        this.auditTableInit(data['audit_status_table']);
      }, error => {

      });
  }

  auditChartInit(data: any): void {
    this.auditTitle.title = data['data_options']['title'];
    this.auditTitle.tooltip = data['chart_title_tooltips'];
    const audit = new Chart(this.audit.nativeElement, {
      type: "horizontalBar",
      data: {
        datasets: data['datasets'],
        labels: data['labels']
      },
      options: {
        responsive: false,
        legend: { display: false },
        animation: {
          onComplete: function() {
            const chartInstance = this.chart;
            let ctx = chartInstance.ctx;
            ctx.textAlign = "left";
            ctx.font = "9px";
            ctx.fillStyle = "#fff";

            Chart.helpers.each(
              this.data.datasets.forEach(function(dataset, i) {
              const meta = chartInstance.controller.getDatasetMeta(i);
              Chart.helpers.each(
                meta.data.forEach(function(bar, index) {
                  data = dataset.data[index];
                  if (i == 0) {
                    ctx.fillText(data, 50, bar._model.y + 4);
                  } else {
                    ctx.fillText(data, bar._model.x - 25, bar._model.y + 4);
                  }
                }),
                this
              );
            }),
              this
          );

            // draw percentage count
            this.data.datasets[0].data.forEach(function(data, index) {
              const percentage = (100.0 * (this.data.datasets[1].data[index]/this.data.datasets[0].data[index])).toFixed(0)+"%";
              const meta = chartInstance.controller.getDatasetMeta(1);
              const posX = meta.data[index]._model.x;
              const posY = meta.data[index]._model.y;

              ctx.fillStyle = "black";
              ctx.fillText(percentage, posX + 4, posY + 4);
                  }, this);
          }
        },
        tooltips: {
          enabled: false
        },
        hover: {
          animationDuration: 0
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 11
              },
              scaleLabel: {
                display: true,
                labelString: data['data_options']['xaxis_title']
              },
              gridLines: {},
              stacked: true
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: data['data_options']['yaxis_title']
              },
              gridLines: {
                display: false,
                color: "#fff",
                zeroLineColor: "#fff",
                zeroLineWidth: 0
              },
              stacked: true
            }
          ]
        },
      },
    });
  }

  auditTableInit(dataTable: {data: Array<any>, tooltips: any}): void {
    let data = [];
    let columns = [
      {title: 'Department', field:'department', headerTooltip: dataTable.tooltips['Department'] },
      {title: 'Accounted Time', field: 'acc_time', sorter:"date", sorterParams: { format: "DD/MM/YYYY HH:mm:ss" }, headerTooltip: dataTable.tooltips['Accounted Time'] },
      {title: 'Percent Complete', field: 'percent_complete', headerTooltip: dataTable.tooltips['Percent Complete'] },
      {title: 'Process Time', field: 'resourse_time', headerTooltip: dataTable.tooltips['Resource Time'] },
    ];
    dataTable.data.forEach( (d, i) => {
      let dataObj = {id: i+1, department: d['Department'], acc_time: d['Accounted Time'], percent_complete: d['Percent Complete'], resourse_time: d['Resource Time'] };
      data.push(dataObj);
    });

    const table = new Tabulator(this.table.nativeElement, {
      height: 235,
      data: data,
      layout: "fitColumns",
      columns: columns,
      tooltipsHeader:true,
    });

    switch(dataTable.data.length) {
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
