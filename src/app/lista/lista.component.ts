import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent {

  clientes:any[] = []
  constructor(private service: CustomerService) {
    this.clientes = service.getData();
  }

}
