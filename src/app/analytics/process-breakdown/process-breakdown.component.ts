import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { Chart } from 'chart.js';
import Tabulator from 'tabulator-tables';

@Component({
  selector: 'rpa-process-breakdown',
  templateUrl: './process-breakdown.component.html',
  styleUrls: ['./process-breakdown.component.css']
})
export class ProcessBreakdownComponent implements OnInit {

  @ViewChild('process', {static: true}) process: ElementRef;
  @ViewChild('hours', {static: true}) hours: ElementRef;
  @ViewChild('table', {static: true}) table: ElementRef;

  public departmentProcessTitle: {title: string, tooltip: string} = {title:'', tooltip:''};
  public departmentHoursTitle: {title: string, tooltip: string} = {title:'', tooltip:''};

  constructor(
    private analyticsSrv: AnalyticsService,
  ) { }

  ngOnInit() {
    this.analyticsSrv.getAuditAnalytics()
      .subscribe( info => {
        this.processChartInit(info['process_breakdown_bar_data']);
        this.hoursPieChartInit(info['process_breakdown_pie_data']);
        this.processTableInit(info['proces_detail_table']);
      }, error => {

      });
  }

  processChartInit(data: any): void {
    this.departmentProcessTitle.title = data['data_options']['title'];
    this.departmentProcessTitle.tooltip = data['chart_title_tooltips'];
    const process = new Chart(this.process.nativeElement, {
      type: "horizontalBar",
      data: {
        datasets: data['datasets'],
        labels: data['labels']
      },
      options: {
        responsive: false,
        legend: { display: false },
        tooltips: {
          position: 'nearest',
          mode : 'point',
          callbacks: {
            label: (tooltipItem) => {
              const  process_labels = data.process_labels;
              return process_labels[tooltipItem.datasetIndex][Number(tooltipItem.index)];
            }
          }
        },
        hover :{
          animationDuration:0
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero:true,
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize:11
            },
            scaleLabel: {
              display: true,
              labelString: data['data_options']['xaxis_title']
            },
            gridLines: {
            },
            stacked: true,
          }],
          yAxes: [{
            gridLines: {
              display:false,
              color: "#fff",
              zeroLineColor: "#fff",
              zeroLineWidth: 0
            },
            scaleLabel: {
              display: true,
              labelString: data['data_options']['yaxis_title']
            },
            ticks: {
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize:11
            },
            stacked: true
          }]
        },
      },
    });
  }

  hoursPieChartInit(data: any): void {
    this.departmentHoursTitle.title = data['data_options']['title'];
    this.departmentHoursTitle.tooltip = data['chart_title_tooltips'];
    const hours = new Chart(this.hours.nativeElement, {
      type: 'pie',
      data: {
        datasets: data['datasets'],
        labels: data['labels']
      },
      options: {
        responsive: false,
        legend: {
          display: true,
          position: 'right'
        }
      }
    });
  }

  processTableInit(dataTable: {data: Array<any>, tooltips: any}): void {
    let data = [];
    let columns = [];

    const cutSpace = (str) => {
      if(str.indexOf('.') >= 0) {
        return str.slice(0, str.indexOf('.')) + '_' + str.slice(str.indexOf(' ') + 1);
      }
      return str;
    };

    dataTable.data.forEach( (d, i) => {
      let dataObj = {id: i+1};
      for (let key in d) {
        if(d.hasOwnProperty(key)) {
          dataObj[cutSpace(key)] = d[key];
          if(i == 0) {
            columns.push({title: key, field: cutSpace(key), headerTooltip: dataTable.tooltips[key]});
          }
        }
      }
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
