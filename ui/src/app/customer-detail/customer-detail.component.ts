import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  public customerId: number;
  public customer: CustomerModel;
  sub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService) {
      this.customerId = route.snapshot.params.id;
    }

  ngOnInit(): void {
    this.sub = this.customerService.GetCustomer(this.customerId)
      .subscribe(customer => this.customer = customer);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
