import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Chart } from 'chart.js';
import { WarehouseService } from 'src/app/_services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {
  listWarehouse: any;
  data: any;
  options: any;
  data1: any;
  options1: any;

  constructor(private warehouseComponent: WarehouseService) { }

  ngOnInit(): void {
    this.getLists();
    this.getChartDoughnut();
    this.getChartBars();
  }

  getChartDoughnut() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: ['A', 'B'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  getChartBars() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.options1 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };
  }

  getLists() {
    this.warehouseComponent.getLists().subscribe({
      next: res => {
        this.listWarehouse = res;
        // console.log(res);
      }, error: err => {
        console.log(err);
      }
    })
  }

}
