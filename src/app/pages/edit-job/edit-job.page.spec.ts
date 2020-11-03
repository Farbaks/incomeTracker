import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditJobPage } from './edit-job.page';

describe('EditJobPage', () => {
  let component: EditJobPage;
  let fixture: ComponentFixture<EditJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
