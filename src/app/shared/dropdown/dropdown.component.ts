import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() ddlItems: any[] = [];
  @Input() selectedItem: any;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  
  showItems: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggle(): void {
    this.showItems = !this.showItems;
  }

  select(item: unknown) {
    this.selectedItem = item;
    this.onChange.emit(this.selectedItem);
    this.toggle();
  }
}
