import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputQuotationPage } from './input-quotation.page';

describe('InputQuotationPage', () => {
  let component: InputQuotationPage;
  let fixture: ComponentFixture<InputQuotationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputQuotationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputQuotationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
