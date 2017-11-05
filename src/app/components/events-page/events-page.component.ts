import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { FormService } from '../../shared/services/form.service';
import { Event } from '../../shared/models/event.model';
import { isNumeric } from 'rxjs/util/isNumeric';
declare var Materialize: any;

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css'],
  providers: [DatabaseService, FormService],
})
export class EventsPageComponent implements OnInit {

  constructor(public dbService: DatabaseService, public formService: FormService) { }

  idOfEvent: string = ""
  event: Event;
  events: Event[];  
  comissionDeposit: number;
  comissionCard: number;
  eventKey: string
  updated: boolean = false;

  
  ngOnInit() {
    this.getEvents()
  }

  getEvents() {
    this.dbService.getEvents().subscribe(events => {
      this.events = []
      events.forEach(element => {
        if (element.key != "lArEsa124") {
          this.events.push(new Event().deserialize(element.payload.val(), element.key))
        }
      });
    })
  }

  valuechange(event) {
    if (isNumeric(this.idOfEvent)) {
      this.dbService.getEventsById(this.idOfEvent).subscribe(event => {
        this.event = new Event().deserialize(event.payload.val(), event.key)
      })
    }
  }
}
