import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  urlImg: string = '../../../assets/icon.png';
  ciudad: string = '';
  temperatura = '';
  humedad = 0;
  clima = '';
  descripcion = '';
  query = false;
  loading = false;
  mostrarError = false;

  constructor(private _climaService: ClimaService) {}

  ngOnInit(): void {}

  obtenerClima(): void {
    this.query = false;
    this.loading = true;

    this._climaService.getClima(this.ciudad).subscribe(
      (data) => {
        this.loading = false;
        this.query = true;
        this.temperatura = (data.main.temp - 273).toFixed(2);
        this.humedad = data.main.humidity;
        this.clima = data.weather[0].main;
        this.descripcion = data.weather[0].description;
      },
      (error) => {
        this.loading = false;
        this.error();
      }
    );
  }

  error() {
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
      this.ciudad = '';
    }, 3000);
  }
}
