import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewJobPage } from './new-job.page';

describe('NewJobPage', () => {
  let component: NewJobPage;
  let fixture: ComponentFixture<NewJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
