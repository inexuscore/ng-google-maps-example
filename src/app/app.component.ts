import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  mapZoom = 12;
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  loading = false;

  ngOnInit() {
    this.getCurrentLocation();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  getCurrentLocation() {
    this.loading = true;

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.loading = false;

        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.mapCenter = new google.maps.LatLng(point);
        this.map.panTo(point);

        this.markerInfoContent = "I'm here!";

        this.markerOptions = {
          draggable: false,
          animation: google.maps.Animation.DROP,
        };
      },
      (error) => {
        this.loading = false;

        if (error.PERMISSION_DENIED) {
          this.toastr.error("Couldn't get your location", 'Permission denied');
        } else if (error.POSITION_UNAVAILABLE) {
          this.toastr.error(
            "Couldn't get your location",
            'Position unavailable'
          );
        } else if (error.TIMEOUT) {
          this.toastr.error("Couldn't get your location", 'Timed out');
        } else {
          this.toastr.error(error.message, `Error: ${error.code}`);
        }
      },
      { enableHighAccuracy: true,  }
    );
  }
}
