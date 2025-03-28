import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HeaderComponent } from '../header/header.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor() {}

  accessChart: any;
  cdsGauge: any;
  ciscoGauge: any;
  microsoftGauge: any;
  aulaGauge: any;

  ngOnInit(): void {
    this.createAccessChart();
    this.createGaugeCharts();
  }

  createAccessChart(): void {
    const ctx = document.getElementById('accessChart') as HTMLCanvasElement;
    this.accessChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
        datasets: [
          {
            label: 'CDS',
            data: [20, 15, 30, 10, 23],
            backgroundColor: '#8e44ad',
            borderColor: '#8e44ad',
            borderWidth: 1
          },
          {
            label: 'Cisco',
            data: [29, 20, 27, 13, 22],
            backgroundColor: '#e74c3c',
            borderColor: '#e74c3c',
            borderWidth: 1
          },
          {
            label: 'Microsoft',
            data: [13, 16, 25, 9, 12],
            backgroundColor: '#27ae60',
            borderColor: '#27ae60',
            borderWidth: 1
          },
          {
            label: 'Aula Activa',
            data: [15, 15, 28, 5, 10],
            backgroundColor: '#34495e',
            borderColor: '#34495e',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 30
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  createGaugeCharts(): void {
    this.createGaugeChart('cdsGauge', 85, '#27ae60', '#f1c40f');
    this.createGaugeChart('ciscoGauge', 34, '#27ae60', '#f1c40f');
    this.createGaugeChart('microsoftGauge', 69, '#27ae60', '#f1c40f');
    this.createGaugeChart('aulaGauge', 81, '#27ae60', '#f1c40f');
  }

  createGaugeChart(elementId: string, value: number, colorStart: string, colorEnd: string): void {
    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    
    // Create a gauge chart
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [value, 100 - value],
          backgroundColor: [colorStart, colorEnd],
          borderWidth: 0,
          circumference: 180,
          rotation: 270
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        layout: {
          padding: {
            bottom: -10
          }
        }
      }
    });
  }
}