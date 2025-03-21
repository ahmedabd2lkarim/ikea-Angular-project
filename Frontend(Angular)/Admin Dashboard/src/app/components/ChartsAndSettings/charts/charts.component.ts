import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from "ng-apexcharts";


export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
};

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
  dataLabels: any;
  fill: ApexFill;
};
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { OrderService } from '../../../services/charts-and-order.service';

@Component({
  selector: 'app-charts',
  imports: [NgxChartsModule, NgApexchartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions1: Partial<ChartOptions1> | any;
  public chartOptions2: Partial<ChartOptions2> | any;
  revenueData: any[] = [];
  view: [number, number] = [500, 300];

  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showGridLines = true;
  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.loadLineChart();
    this.loadDonutChart([], []);
    this.loadCategoryData();
  }
  loadCategoryData() {
    this.orderService.getCategoryProductCounts().subscribe(
      (data) => {
        const categories = data.map(item => item.categoryName);
        const productCounts = data.map(item => item.productCount);
        this.loadDonutChart(categories, productCounts);
      },
      (error) => {
        console.error("Error fetching category data:", error);
      }
    );
  }

  loadLineChart() {
    this.orderService.getRevenueTrends().subscribe(
      (response) => {
        const seriesData = response.map((item: any) => ({
          x: item.month,
          y: item.totalRevenue
        }));

        this.chartOptions1 = {
          series: [{ name: "Revenue", data: seriesData }],
          chart: { type: "line", height: 350, toolbar: { show: false } },
          dataLabels: { enabled: false },
          colors: [
            "rgb(239, 220, 171)",],

          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              gradientToColors: ["rgb(68, 54, 39)", "rgb(239, 220, 171)"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          markers: {
            size: 4,
            colors: ["#FFA41B"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
              size: 7,
            },
          },
          stroke: { curve: "smooth" },
          title: { text: "Revenue Trends", align: "left" },
          xaxis: { type: "category" },
          yaxis: { opposite: true },
          legend: { horizontalAlign: "left" }
        };
      },
      (error) => console.error('Error fetching revenue trends:', error)
    );
  }

  loadDonutChart(labels: string[], series: number[]) {
    this.chartOptions2 = {
      chart: {
        animations: {
          enabled: false,
        },
        height: 400,
        type: "donut"
      },
      stroke: {
        curve: "smooth",
        width: 0
      },
      series: series,
      labels: labels,
      colors: [
        "rgb(68, 54, 39)",
        "rgb(239, 220, 171)",
        "rgb(242, 246, 208)",
        "rgb(189, 157, 107)",
        "rgb(143, 124, 112)",
        "rgb(214, 196, 161)",
        "rgb(170, 144, 120)",
        "rgb(102, 83, 69)",
        "rgb(221, 211, 182)",
        "rgb(195, 178, 138)"
      ],
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "TOTAL PRODUCT",
                fontSize: "16px",
                color: "#444",
                formatter: () => series.reduce((a, b) => a + b, 0) + " items"
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 1,
          gradientToColors: [
            "rgb(50, 40, 30)",
            "rgb(220, 200, 160)",
            "rgb(135, 105, 57)",
            "rgb(160, 148, 100)",
            "rgb(120, 105, 95)",
            "rgb(200, 180, 140)",
            "rgb(150, 130, 110)",
            "rgb(85, 70, 55)",
            "rgb(210, 200, 170)",
            "rgb(175, 155, 115)"
          ],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.1,
          stops: [2, 18, 28, 100, 60, 5]
        }
      },
      legend: {
        show: true,
        position: "bottom", 
        fontSize: "12px",
        labels: {
          colors: "#333"
        },
        markers: {
          width: 12,
          height: 12,
          radius: 5
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
