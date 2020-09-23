import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputPaymentPage } from './input-payment.page';

describe('InputPaymentPage', () => {
  let component: InputPaymentPage;
  let fixture: ComponentFixture<InputPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
