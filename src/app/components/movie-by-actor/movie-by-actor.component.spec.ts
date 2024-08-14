import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieByActorComponent } from './movie-by-actor.component';

describe('MovieByActorComponent', () => {
  let component: MovieByActorComponent;
  let fixture: ComponentFixture<MovieByActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieByActorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieByActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
