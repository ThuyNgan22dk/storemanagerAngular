import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/_services/warehouse.service';
import { OrderService } from 'src/app/_services/order.service';
import { ImportService } from 'src/app/_services/import.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent implements OnInit {
  listWarehouse: any;
  listWarehouseImport: any;
  listWarehouseOrder: any;
  dataImportTotal: number = 10;
  dataOrderTotal: number = 10;
  listDate1 = [
    '2023-06-05',
    '2023-06-06',
    '2023-06-07',
    '2023-06-08',
    '2023-06-09',
    '2023-06-10',
    '2023-06-11',
  ];
  listDate2 = [
    '2023-06-12',
    '2023-06-13',
    '2023-06-14',
    '2023-06-15',
    '2023-06-16',
    '2023-06-17',
    '2023-06-18',
  ];
  listDate3 = [
    '2023-06-19',
    '2023-06-20',
    '2023-06-21',
    '2023-06-22',
    '2023-06-23',
    '2023-06-24',
    '2023-06-25',
  ];
  selectlistDate: any;
  listDateForChart: any = [
    { name: '2023-06-05,..,2023-06-11', date: this.listDate1 },
    { name: '2023-06-12,..,2023-06-18', date: this.listDate2 },
    { name: '2023-06-19,..,2023-06-25', date: this.listDate3 }
  ];
  listDate: any;
  listTotal: any;
  dataImportDay: any[];
  dataOrderDay: any[];
  data: any;
  options: any;
  data1: any;
  options1: any;
  data2: any;
  options2: any;

  constructor(
    private warehouseService: WarehouseService,
    private orderService: OrderService,
    private importService: ImportService
  ) {}

  ngOnInit(): void {
    // this.getListImport();
    // this.getListOrder();
    this.getChartDoughnut(0);
    this.getPriceTotal();
    this.getChartLine(0, 0);
    this.getListDateForLine();
    this.getChartBars(0, 0, 0);
    this.getImportAndOrderTotalDay(this.listDate1);
  }

  getChartDoughnut(listdata: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Nhập hàng', 'Xuất hàng'],
      datasets: [
        {
          data: listdata,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--pink-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--pink-400'),
          ],
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }

  getChartLine(listdata: any, listdate: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data2 = {
      labels: listdate,
      datasets: [
        {
          label: 'Doanh thu',
          data: listdata,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
        }
      ],
    };

    this.options2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  getChartBars(listdataimport: any, listdataorder: any, listDate: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data1 = {
      labels: listDate,
      datasets: [
        {
          label: 'Nhập hàng',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: listdataimport,
        },
        {
          label: 'Xuất hàng',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: listdataorder,
        },
      ],
    };

    this.options1 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  // getLists() {
  //   this.warehouseService.getList().subscribe({
  //     next: (res) => {
  //       this.listWarehouse = res;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getListImport() {
  //   this.warehouseService.getListType('import').subscribe({
  //     next: (res) => {
  //       this.listWarehouseImport = res;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getListOrder() {
  //   this.warehouseService.getListType('order').subscribe({
  //     next: (res) => {
  //       this.listWarehouseOrder = res;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  getPriceTotal() {
    this.importService.getTotalImport().subscribe({
      next: (res) => {
        this.dataImportTotal = res;
        this.data.datasets[0].data.push(this.dataImportTotal);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.orderService.getTotalOrder().subscribe({
      next: (res) => {
        this.dataOrderTotal = res;
        this.data.datasets[0].data.push(this.dataOrderTotal);
        this.getChartDoughnut(this.data.datasets[0].data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetData1() {
    this.data1.datasets[0].data = [];
    this.data1.datasets[1].data = [];
  }

  getListDateForLine(){
    this.orderService.getListDates().subscribe({
      next: (res) => {
        this.listDate = res;
        this.getListTotalForLine(this.listDate);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getListTotalForLine(dates: any){
    this.orderService.getListTotalForChart(dates).subscribe({
      next: (res) => {
        this.listTotal = res;
        this.getChartLine(this.listTotal, dates);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getImportAndOrderTotalDay(listDate: any) {
    this.resetData1();
    
    listDate.forEach((date) => {
      this.importService.getTotalDayImport(date).subscribe({
        next: (res) => {
          this.dataImportDay = res;
          this.data1.datasets[0].data.push(this.dataImportDay);
        },
        error: (err) => {
          this.data1.datasets[0].data.push(0);
        },
      });
    });

    listDate.forEach((date) => {
      this.orderService.getTotalDayOrder(date).subscribe({
        next: (res) => {
          this.dataOrderDay = res;
          this.data1.datasets[1].data.push(this.dataOrderDay);
          this.getChartBars(
            this.data1.datasets[0].data,
            this.data1.datasets[1].data,
            listDate
          );
        },
        error: (err) => {
          this.data1.datasets[1].data.push(0);
          this.getChartBars(
            this.data1.datasets[0].data,
            this.data1.datasets[1].data,
            listDate
          );
        },
      });
    });
  }
}
