import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewChildren } from '@angular/core';
import { CreerReservationService } from './services/creer-reservation.service';
import { ReserverAfficherAnnonce, CreerReservation, PlaceAdress, AdresseGoogleApi } from './ReserverAfficherAnnonce';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core'
import { } from 'googlemaps';

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styles: []
})
export class ReserverComponent implements OnInit {

  @ViewChild('test') test: any;
  @ViewChild('frame') frame: any;
  addressDepart: string;
  adressOuput: string;
  annonces: Array<ReserverAfficherAnnonce> = [];
  annonceDetail: any;
  creerReservation: CreerReservation;
  afficher: boolean = false;
  dateSeletionner: string;
  destinationSelectionner: string;
  itineraireCovoit: AdresseGoogleApi;
  distanceKm: string = "0 Km";
  duree: string = "0 minute";

  @ViewChild("addressInput") searchElementRefDep: ElementRef;
  @ViewChild("adressOuput") searchElementRefArr: ElementRef;

  autocompleteDep: google.maps.places.Autocomplete;
  autocompleteArr: google.maps.places.Autocomplete;

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  constructor(private _mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public creerReservationService: CreerReservationService, public router: Router) {

  }

  ngOnInit() {
    this._mapsAPILoader.load().then(() => {
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
        this.addressDepart = this.saveAdress(place).locality;
        this.updateInput();
        //console.log(this.addressInput);
      })
    })

    this.autocompleteArr.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = this.autocompleteArr.getPlace();
        this.destinationSelectionner = this.saveAdress(place).locality;
      })
    })

    this.autocompleteArr.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = this.autocompleteArr.getPlace();
        this.destinationSelectionner = this.saveAdress(place).locality;
      })
    })

    this.autocompleteArr.addListener("place_changed", () => {
      this.ngZone.run(() => {
        this.computeDistAndDuree();
      })
    })

    })
  }

  updateInput() {
    this.selectVille();
  }

  selectVille() {
    this.creerReservationService.listerAnnonceVilleDepart(this.addressDepart)
      .subscribe(
        (listeAnnonces: Array<ReserverAfficherAnnonce>) =>
          this.annonces = listeAnnonces,
        (err: any) => {
          console.log(err)
        }
      )
  }

  ngAfterViewInit() {
    this.test.show();
  }

  onAdresseDepChange() {
    if (this.itineraireCovoit.adresseArr != undefined) {
      this.computeDistAndDuree()
    }
  }

  computeDistAndDuree() {
    let directionsService = new google.maps.DirectionsService
    directionsService.route({
      origin: this.searchElementRefDep.nativeElement.value,
      destination: this.searchElementRefArr.nativeElement.value,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {
      if (status) {
        var route = response.routes[0];
        this.distanceKm = route.legs[0].distance.text
        this.duree = route.legs[0].duration.text
        console.log(this.duree);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }

  afficherInfo(id: number) {
    this.annonces.forEach(annonce => {
      if (annonce.id == id) {
        this.annonceDetail = annonce;
      }
    })
    this.afficher = true;
    this.frame.show();
  }

  sendReservation() {
    this.creerReservation = new CreerReservation(this.annonceDetail.id, 1, this.annonceDetail.depart, this.annonceDetail.adresse_arriver, this.annonceDetail.adresse_arriver)

    this.creerReservationService.addReservation(this.creerReservation)
      .subscribe(
        (annonce: CreerReservation) => {
          this.closeWindows();
        },
        (err: any) => {
          console.log(err);
        }
      )
    this.closeWindows();
  }

  redirect() {
    this.router.navigate(["/collaborateur/reservations"]);
  }

  closeWindows() {
    this.frame.hide();
    this.redirect();
  }

  saveAdress(place: google.maps.places.PlaceResult) {
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
}
