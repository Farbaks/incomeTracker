import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobDetailPage } from './job-detail.page';

describe('JobDetailPage', () => {
  let component: JobDetailPage;
  let fixture: ComponentFixture<JobDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
