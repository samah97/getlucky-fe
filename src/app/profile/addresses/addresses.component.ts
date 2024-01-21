import {Component, OnInit} from '@angular/core';
import {AddressService} from "../../core/services/address.service";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss'
})
export class AddressesComponent implements OnInit{

    addressesList:any[];

    constructor(private readonly addressService:AddressService) {
    }

    ngOnInit(): void {
        this.initData();
    }
    initData(){
        this.addressService.myAddresses().subscribe({
            next: (response)=>{

            }
        })
    }


    showAddAddress() {

    }
}
