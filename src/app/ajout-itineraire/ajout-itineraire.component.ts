import { Component, OnInit, NgZone } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Adresse, PlaceAdress } from '../publier-annonce.service';
import { } from 'googlemaps';
import {MapsAPILoader} from '@agm/core'
import { AfterViewInit } from '@angular/core'
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-ajout-itineraire',
  templateUrl: './ajout-itineraire.component.html',
  styles: []
})
export class AjoutItineraireComponent implements OnInit{

  immatriculation:string
  adresseDep:string
  adresseArr:string

  distance:string
  duree:string

  itineraireCovoit:Adresse = new Adresse()

  @ViewChild("searchDep")
  public searchElementRefDep: ElementRef;

  @ViewChild("searchArr")
  public searchElementRefArr: ElementRef;

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  autocompleteDep:google.maps.places.Autocomplete
  autocompleteArr:google.maps.places.Autocomplete

  @Output() onAdresseChange: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private _mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { 
    
  }

  ngOnInit() {
    //load Places Autocomplete
    this._mapsAPILoader.load().then( () => {
      this.autocompleteDep = new google.maps.places.Autocomplete(this.searchElementRefDep.nativeElement, {
        types: []
      })

      this.autocompleteArr = new google.maps.places.Autocomplete(this.searchElementRefArr.nativeElement, {
        types: []
      })

      this.autocompleteDep.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = this.autocompleteDep.getPlace();

          this.onPlaceAdresseDepChange(this.saveAdress(place))

          this.onAdresseDepChange()
        })
      })

      this.autocompleteArr.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = this.autocompleteArr.getPlace();

          this.onPlaceAdresseArrChange(this.saveAdress(place))

          this.onAdresseArrChange()
        })
      })

    })

  }

  onAdresseDepChange(){
    if(this.itineraireCovoit.adresseArr != undefined){
      this.computeDistAndDuree()
    }
  }

  onAdresseArrChange(){
    if(this.itineraireCovoit.adresseDep != undefined){
      this.computeDistAndDuree()
    }
  }

  onPlaceAdresseDepChange(newPlaceAdress: PlaceAdress) {
    this.itineraireCovoit.adresseDep = newPlaceAdress
    this.onAdresseChange.emit(this.itineraireCovoit);

  }

  onPlaceAdresseArrChange(newPlaceAdress: PlaceAdress) {
    this.itineraireCovoit.adresseArr = newPlaceAdress
    this.onAdresseChange.emit(this.itineraireCovoit);
  }

  saveAdress(place: google.maps.places.PlaceResult){

    let placeAdress = new PlaceAdress()

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (this.componentForm[addressType]) {
        var val = place.address_components[i][this.componentForm[addressType]];

        placeAdress[addressType] = val
      }
    }
    return placeAdress
  }

  computeDistAndDuree(){
    let directionsService = new google.maps.DirectionsService

    directionsService.route({
      origin: this.searchElementRefDep.nativeElement.value,
      destination: this.searchElementRefArr.nativeElement.value,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {
      if (status) {
        var route = response.routes[0];

        this.distance = route.legs[0].distance.text
        this.duree = route.legs[0].duration.text

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }
}
