import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import Tabulator from 'tabulator-tables';
import { Chart } from 'chart.js';

@Component({
  selector: 'rpa-rpa-analyzer',
  templateUrl: './rpa-analyzer.component.html',
  styleUrls: ['./rpa-analyzer.component.css']
})
export class RpaAnalyzerComponent implements OnInit {

  @ViewChild('rpa', {static: true}) rpa: ElementRef;
  @ViewChild('table', {static: true}) table: ElementRef;
  private plotData: any;
  public plotTitle: {title: string, tooltip: string} = {title:'', tooltip:''};
  public plotIndex: number = 0;
  private chart: any;
  public labels: {[key:string]: string} = {};

  constructor(
    private analyticsSrv: AnalyticsService,
  ) { }

  ngOnInit() {
    this.analyticsSrv.getRPAAnalysis()
      .subscribe( data => {
        this.plotData = data['plot_data'];
        this.rpaChartInit(data['plot_data'][0]);
        this.rpaTableInit(data['process_rpa_table']);
      }, error => {

      });
  }

  rpaChartInit(data: any): void {
    this.plotTitle.title = data['data_options']['title'];
    this.plotTitle.tooltip = data['chart_title_tooltips'];
    this.labels = data['legend_dict'];
    this.chart = new Chart(this.rpa.nativeElement, {
      type: 'bubble',
      data: {
        datasets: data['data']
      },
      options: {
        tooltips: {
          position: 'nearest',
          callbacks: {
            label: (tooltipItem) => {
              const  process_labels = data['process_labels'];
              return process_labels[tooltipItem.datasetIndex];
            }
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        legend : {
          display: false
          // position : 'right',
          // fullWidth: false
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: data['data_options']['yaxis_title']
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: data['data_options']['xaxis_title']
            }
          }]
        },
        onClick: (ev) => {
          console.log( 'click ::: ', ev );
        }
      },
    });
  }

  initPlot(index: number): void {
    if(index < 0) {
      index = 0;
    }
    if(index > this.plotData.length - 1 ) {
      index = this.plotData.length - 1;
    }
    if(this.plotIndex !== index) {
      this.chart.destroy();
      this.rpaChartInit(this.plotData[index]);
    }
    this.plotIndex = index;
  }

  rpaTableInit(dataTable: {data: Array<any>, tooltips: any}): void {
    let data = [];
    let columns = [];
    // let columns = [
    //   {title: 'Department', field:'department', headerTooltip: dataTable.tooltips['Department']},
    //   {title: 'Basic Index', field: 'basic_index', headerTooltip: dataTable.tooltips['Basic Index']},
    //   {title: 'PA Yield', field: 'pa_yield', headerTooltip: dataTable.tooltips['PA Yield']},
    //   {title: 'Process', field: 'process', headerTooltip: dataTable.tooltips['Process']},
    //   {title: 'Process Cost', field: 'process_cost', headerTooltip: dataTable.tooltips['Process Cost']},
    //   {title: 'Process Time', field: 'process_time', headerTooltip: dataTable.tooltips['Process Time']},
    //   {title: 'RPA Development Cost', field: 'rpa_dev_cost', headerTooltip: dataTable.tooltips['RPA Development Cost']},
    //   {title: 'RPA Development Hours', field: 'rpa_dev_hrs', headerTooltip: dataTable.tooltips['RPA Development Hours']}
    // ];
    // dataTable.data.forEach( (d, i) => {
    //   let dataObj = {
    //     id: i+1,
    //     department: d['Department'],
    //     basic_index: d['Basic Index'],
    //     pa_yield: d['PA Yield'],
    //     process: d['Process'],
    //     process_cost: d['Process Cost'],
    //     process_time: d['Process Time'],
    //     rpa_dev_cost: d['RPA Development Cost'],
    //     rpa_dev_hrs: d['RPA Development Hours']
    //   };
    //   data.push(dataObj);
    // });

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
