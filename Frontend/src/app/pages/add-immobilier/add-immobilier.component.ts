import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { ContractServiceService } from './../../services/contract-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImmobilierAnn } from 'src/app/model/immobilier-ann';

@Component({
  selector: 'app-add-immobilier',
  templateUrl: './add-immobilier.component.html',
  styleUrls: ['./add-immobilier.component.scss']
})
export class AddImmobilierComponent implements OnInit {
  form: FormGroup
  constructor(private Formbuilder: FormBuilder, private contractService: ContractServiceService, private router: Router) { }

  ngOnInit() {
    this.form = this.Formbuilder.group({
      titre: "",
      ville: "",
      price: "",
      surface: "",
      picture: "",
    });
  }
  ImmobilierAnn:ImmobilierAnn=new ImmobilierAnn();
  register() {
    const data = {
      addressOwner: localStorage.getItem("useraddress"),
      titre: this.form.getRawValue().titre,
      ville: this.form.getRawValue().ville,
      price: this.form.getRawValue().price,
      surface: this.form.getRawValue().surface,
      image: "./assets/img/immobilier/image17.jfif",
      isAnnounced: 1,
    }
    this.ImmobilierAnn.ownerAddress=localStorage.getItem("useraddress");
    this.ImmobilierAnn.titre= this.form.getRawValue().titre;
    this.contractService.SaveImmobilier(data).subscribe(res => {
      console.log(res);
      });
      this.contractService.addImmobilier(this.ImmobilierAnn).subscribe(res => {
        console.log(res);
      });
      window.location.reload();
    }
  }



