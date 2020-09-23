import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SigupPage } from './sigup.page';

describe('SigupPage', () => {
  let component: SigupPage;
  let fixture: ComponentFixture<SigupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SigupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
