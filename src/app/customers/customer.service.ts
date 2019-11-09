import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../model/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private dbPath = '/customers';
  customerRef: AngularFirestoreCollection<Customer> = null;
  constructor(private db: AngularFirestore) {
    this.customerRef = db.collection(this.dbPath);
  }

  createCustomer(customer: Customer): void {
    this.customerRef.add({ ...customer });
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.customerRef.doc(key).update(value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.customerRef.doc(key).delete();
  }

  getCustomerList(): AngularFirestoreCollection<Customer> {
    return this.customerRef;
  }

  deleteAll() {
    this.customerRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      }
    );
  }
}
