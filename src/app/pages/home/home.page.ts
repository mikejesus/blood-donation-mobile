/* eslint-disable max-len */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import {ActionSheetController} from '@ionic/angular/';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  segmentValue = '1';
  requests: any[] = [];
  donors: any[] = [];
  lineChart;
  newHeight = 0;

  constructor(public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    console.log('On init');
    this.requests = [
      { id: 1, name: 'Michael Olawuni', age: 31, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 2, name: 'Sunday Olawuni', age: 25, address: 'California, US', gender: 'Female', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 3, name: 'Emmanuel Olawuni', age: 25, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 4, name: 'Ebenezer Olawuni', age: 4, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 5, name: 'Ayo Olawuni', age: 16, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 6, name: 'Mary Olawuni', age: 6, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 7, name: 'Funmilayo Olawuni', age: 13, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
    ];
    this.donors = [
      { id: 1, name: 'Change Name', age: 31, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 2, name: 'Another Name', age: 25, address: 'California, US', gender: 'Female', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 3, name: 'Your name', age: 25, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 4, name: 'My name', age: 4, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 5, name: 'Testing names', age: 16, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
      { id: 6, name: 'I dont know', age: 6, address: 'California, US', gender: 'Male', 'blood-group': 'O+', distance: 23, photo: 'assets/img/avatar1.jpg' },
    ];

  }

  ngAfterViewInit() {
    console.log('After view init');
    this.lineChartMethod();
  }

  segmentChange(e) {
    console.log(e);
    this.segmentValue = e.detail.value;
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Disease Rate',
            fill: false,
            backgroundColor: '#fff',
            borderColor: '#E31007',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#fff',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#E31007',
            pointHoverBorderColor: '#E31007',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,

            data: [0, 10, 25, 30, 25, 15, 10, 20, 18, 5, 10, 20]
          },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec']
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false
            }
          },
          y: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              display: false,
            }
          }
        }
      }
    });
  }
  scroll(event) {
    const value = event.detail.scrollTop;
    if (value > 40) {
      this.newHeight += 5;
    }
    else {
      this.newHeight = 0;
    }

    if (value > 180 && this.newHeight <= 65) {
      this.newHeight += 50;
    }
  }

  async options(data){
    console.log(data)
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      cssClass: 'custom-class',
      buttons: [
        {
          text: 'Call',
          icon: 'call',
          handler: ()=>{
            console.log("Call clicked")
          }
        },
        {
          text: 'Mail',
          icon: 'mail',
          handler: ()=>{
            console.log("Mail clicked")
          }
        },
        {
          text: 'Locate',
          icon: 'locate',
          handler: ()=>{
            console.log("Locate clicked")
          }
        },
         {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: ()=>{
            console.log("Cancel clicked")
          }
        }
      ]

    });
    await actionSheet.present();

  }
}
