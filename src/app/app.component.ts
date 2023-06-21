import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

  
})
export class AppComponent {
    item!: Observable<any>;
    firestore: Firestore = inject(Firestore);
    newTodos: Array<any>;
    todoText:string = '';

    constructor() {
      const coll = collection(this.firestore, 'todos');
      this.item = collectionData(coll);

      this.item.subscribe((newItem) => {
        console.log('neue Todos sind:', newItem);
        this.newTodos = newItem;
      });
    }

    addTodo() {
      const coll = collection(this.firestore, 'todos');
      setDoc(doc(coll), {name: this.todoText});
    }
}
