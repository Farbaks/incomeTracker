import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputItemPage } from './input-item.page';

describe('InputItemPage', () => {
  let component: InputItemPage;
  let fixture: ComponentFixture<InputItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
